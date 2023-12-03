"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Activity
from api.utils import generate_sitemap, APIException
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'gif', 'docx', 'xlsx'}  # Extensiones permitidas para los archivos

api = Blueprint('api', __name__)

def allowed_file(filename): 
     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

@api.route('/user', methods=['POST'])
def register_user():
    if request.method == "POST":
        data_form = request.form

        data = {
            "name": data_form.get("name"),
            "surname": data_form.get("surname"),
            "email": data_form.get("email"),
            "emailDCH": data_form.get("emailDCH"),
            "unit": data_form.get("unit"),
            "password": data_form.get("password"),
            "jobPosition": data_form.get("jobPosition"),
            "description": data_form.get("description")
        }

        # Validación de parámetros
        missing_params = [param for param in ["name", "surname", "email", "emailDCH", "unit", "password", "jobPosition"]
                          if data.get(param) is None]

        if missing_params:
            return jsonify({"msg": f"Missing parameters: {', '.join(missing_params)}"}), 400

        user = User.query.filter_by(email=data.get("email")).first()
        if user is not None:
            return jsonify({"msg": "Email already registered"}), 400

        password_salt = b64encode(os.urandom(32)).decode('utf-8')
        password_hash = set_password(data.get("password"), password_salt)

        new_user = User(
            name=data.get("name"),
            surname=data.get("surname"),
            unit=data.get("unit"),
            email=data.get("email"),
            emailDCH=data.get("emailDCH"),
            jobPosition=data.get("jobPosition"),
            description=data.get("description"),
            password=password_hash,
            salt=password_salt
        )

        db.session.add(new_user)
        try:
            db.session.commit()
            return jsonify({"msg": "User successfully registered"}), 201
        except Exception as error:
            db.session.rollback()
            return jsonify({"msg": "Error registering user", "error": str(error)}), 500
        return jsonify([]), 200

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        data = request.json
        email = data.get("email", None)
        password = data.get("password", None)

        if email is None:
            return jsonify({"msg": "Missing email parameter"}), 400
        if password is None:
            return jsonify({"msg": "Missing password parameter"}), 400

        user = User.query.filter_by(email=email).one_or_none()
        if user is not None:
            if check_password(user.password, password, user.salt):
                token = create_access_token(identity=user.id)
                # Utiliza el método serialize() para obtener la información del usuario
                return jsonify({
                    "token": token,
                    "user": user.serialize()
                }), 200
            else:
                return jsonify({"msg": "Bad credentials"}), 400
        return jsonify({"msg": "Bad credentials"}), 400


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user_by_alias():
    if request.method == "GET":
        user = User.query.filter_by(id=get_jwt_identity()).first()

        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({'error': 'User not found'}), 404


@api.route('/activity', methods=['POST'])
@jwt_required()
def add_activity():
    try:
        data = request.get_json()

        # Validación de parámetros
        missing_params = [param for param in ["fecha_actividad", "tecnico_nombre_apellido", "personal_infra_nombre_apellido"]
                          if data.get(param) is None]

        if missing_params:
            return jsonify({"msg": f"Missing parameters: {', '.join(missing_params)}"}), 400

        # Crear una nueva instancia de Activity con los datos proporcionados
        new_activity = Activity(
            fecha_actividad=data.get('fecha_actividad'),
            control_incidente=data.get('control_incidente'),
            control_cambio_cor=data.get('control_cambio_cor'),
            control_cambio_dcce=data.get('control_cambio_dcce'),
            tecnico_nombre_apellido=data.get('tecnico_nombre_apellido'),
            personal_infra_nombre_apellido=data.get('personal_infra_nombre_apellido'),
            actividad=data.get('actividad'),
            actividad_satisfactoria=data.get('actividad_satisfactoria'),
            tipo_de_mantenimiento=data.get('tipo_de_mantenimiento'),
            observaciones=data.get('observaciones')
        )

        # Agregar la nueva actividad a la base de datos
        db.session.add(new_activity)
        db.session.commit()

        # Devolver una respuesta exitosa
        response_body = {"msg": "Activity added successfully"}
        return jsonify(response_body), 201
    except Exception as e:
        # En caso de error, realizar un rollback y devolver un mensaje de error
        db.session.rollback()
        return jsonify({"msg": "Error adding activity", "error1": str(e)}), 500

@api.route('/activities-by-year/<int:year>', methods=['GET'])
@jwt_required()
def get_activities_by_year(year):
    # Filtrar actividades por año
    activities = Activity.query.filter(db.extract('year', Activity.fecha_actividad) == year).all()

    # Convertir actividades a un formato que puedas enviar al frontend
    activities_data = [
        {
            "year":activity.fecha_actividad.year,
            "mes": activity.fecha_actividad.month,
            "dia":activity.fecha_actividad.day,
            "actividad": activity.actividad,
            "tipo_de_mantenimiento":activity.tipo_de_mantenimiento,
            "tecnico_nombre_apellido":activity.tecnico_nombre_apellido,
            "fecha_actividad": activity.fecha_actividad,
            "actividad_satisfactoria": activity.actividad_satisfactoria,
            "control_cambio_cor": activity.control_cambio_cor,
            "id":activity.id,
            # Agrega otros campos según sea necesario
        }
        for activity in activities
    ]

    return jsonify({"activities": activities_data})

@api.route('/get-available-years', methods=['GET'])
@jwt_required()
def get_available_years():
    years = db.session.query(db.extract('year', Activity.fecha_actividad)).distinct().all()
    years_list = [year[0] for year in years]  # Convertir a lista
    return jsonify({"years": years_list})

@api.route('/documents', methods=['POST'])
@jwt_required()
def add_document():
    if request.method == "POST":
        data_form = request.form
        file = request.files.get('file')  # Obtener el archivo de la solicitud


        data = {
            "document_name": data_form.get("document_name"),
            "document_type": data_form.get("document_type"),
            "document_version": data_form.get("document_version"),
            "document_unit": data_form.get("document_unit"),
        }

        # Validación de parámetros
        missing_params = [param for param in ["document_name", "document_type", "document_version", "document_unit"]
                          if data.get(param) is None]

        if missing_params:
            return jsonify({"msg": f"Missing parameters: {', '.join(missing_params)}"}), 400
        
        if missing_params or file is None or not allowed_file(file.filename):
            return jsonify({"msg": "Invalid parameters or file missing or invalid file format"}), 400

  # Verificar si el documento ya existe
        document = Documents.query.filter_by(document_name=data.get("document_name")).first()

        if document is not None and document.document_version == data.get("document_version"):
            return jsonify({"msg": "Document version already registered"}), 400

# Guardar el archivo en el sistema de archivos
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        new_document = Documents(
            document_name=data.get("document_name"),
            document_type=data.get("document_type"),
            document_version=data.get("document_version"),
            document_unit=data.get("document_unit"),
            document_file=file_path  # Almacenar la ruta del archivo en la base de datos
        )

        db.session.add(new_document)
        try:
            db.session.commit()
            return jsonify({"msg": "Document successfully registered"}), 201
        except Exception as error:
            db.session.rollback()
            return jsonify({"msg": "Error registering Document", "error": str(error)}), 500
        return jsonify([]), 200

    return jsonify(response_body), 200
