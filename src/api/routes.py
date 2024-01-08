"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Activity, MaintenanceEvidence, Documents, Temperature
from api.utils import generate_sitemap, APIException
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename


api = Blueprint('api', __name__)

# Extensiones permitidas para los archivos
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'gif', 'docx', 'xlsx'}


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


@api.route('/users/<unit>', methods=['GET'])
def get_users_by_unit(unit):
    try:
        # Consulta los usuarios que pertenecen a la unidad especificada
        users = User.query.filter_by(unit=unit).all()

        # Serializa los resultados
        serialized_users = [user.serialize() for user in users]

        # Devuelve la respuesta JSON
        return jsonify(serialized_users)

    except Exception as e:
        # Maneja cualquier error y devuelve un mensaje de error
        return jsonify({"error": str(e)}), 500


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
            personal_infra_nombre_apellido=data.get(
                'personal_infra_nombre_apellido'),
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
    activities = Activity.query.filter(db.extract(
        'year', Activity.fecha_actividad) == year).all()

    # Convertir actividades a un formato que puedas enviar al frontend
    activities_data = [
        {
            "year": activity.fecha_actividad.year,
            "mes": activity.fecha_actividad.month,
            "dia": activity.fecha_actividad.day,
            "actividad": activity.actividad,
            "tipo_de_mantenimiento": activity.tipo_de_mantenimiento,
            "tecnico_nombre_apellido": activity.tecnico_nombre_apellido,
            "fecha_actividad": activity.fecha_actividad,
            "actividad_satisfactoria": activity.actividad_satisfactoria,
            "control_cambio_cor": activity.control_cambio_cor,
            "id": activity.id,
            # Agrega otros campos según sea necesario
        }
        for activity in activities
    ]

    return jsonify({"activities": activities_data})


@api.route('/get-available-years', methods=['GET'])
@jwt_required()
def get_available_years():
    years = db.session.query(db.extract(
        'year', Activity.fecha_actividad)).distinct().all()
    years_list = [year[0] for year in years]  # Convertir a lista
    return jsonify({"years": years_list})


@api.route('/activities/last-10', methods=['GET'])
@jwt_required()
def get_last_10_activities():
    # Ordenar actividades por fecha de manera descendente
    activities = Activity.query.order_by(
        Activity.fecha_actividad.desc()).limit(10).all()

    # Convertir actividades a un formato que puedas enviar al frontend
    activities_data = [
        {
            "year": activity.fecha_actividad.year,
            "mes": activity.fecha_actividad.month,
            "dia": activity.fecha_actividad.day,
            "actividad": activity.actividad,
            "tipo_de_mantenimiento": activity.tipo_de_mantenimiento,
            "tecnico_nombre_apellido": activity.tecnico_nombre_apellido,
            "fecha_actividad": activity.fecha_actividad,
            "actividad_satisfactoria": activity.actividad_satisfactoria,
            "control_cambio_cor": activity.control_cambio_cor,
            "id": activity.id,
            # Agrega otros campos según sea necesario
        }
        for activity in activities
    ]

    return jsonify({"activities": activities_data})


@api.route('/documents', methods=['POST'])
@jwt_required()
def add_document():

    try:
        document_name = request.form.get("document_name")
        document_type = request.form.get("document_type")
        document_version = request.form.get("document_version")
        document_unit = request.form.get("document_unit")

        # Validación de parámetros
        if not all([document_name, document_type, document_version, document_unit]):
            return jsonify({"msg": "Missing parameters"}), 400

        # Verificar si el documento ya existe
        document = Documents.query.filter_by(
            document_name=document_name).first()

        if document is not None and document.document_version == document_version:
            return jsonify({"msg": "Document version already registered"}), 400

        # Obtener el archivo de la solicitud
        file = request.files.get("document_file")

        if file and allowed_file(file.filename):
            # Guardar el archivo en el sistema de archivos
            filename = secure_filename(file.filename)
            file_path = os.path.join("uploads", filename)
            file.save(file_path)
        else:
            return jsonify({"msg": "Invalid file or file format"}), 400

        # Guardar la información en la base de datos
        new_document = Documents(
            document_name=document_name,
            document_type=document_type,
            document_version=document_version,
            document_unit=document_unit,
            document_file=file_path,

        )

        db.session.add(new_document)
        db.session.commit()

        return jsonify({"msg": "Document successfully registered"}), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"msg": f"Error registering Document: {str(error)}"}), 500


@api.route('/add-maintenance-evidence/<int:activity_id>', methods=['POST'])
@jwt_required()
def add_maintenance_evidence(activity_id):
    try:
        # Obtener la actividad asociada al ID proporcionado
        activity = Activity.query.get(activity_id)

        if not activity:
            return jsonify({"msg": "Activity not found"}), 404

        # Verificar si el usuario tiene permisos para agregar evidencia a esta actividad (puedes personalizar esto según tus necesidades)
      
        # Obtener el archivo de la solicitud
        file = request.files.get("evidence_file")

        if file and allowed_file(file.filename):
            # Guardar el archivo en el sistema de archivos
            filename = secure_filename(file.filename)
            file_path = os.path.join("uploads", filename)
            file.save(file_path)
        else:
            return jsonify({"msg": "Invalid file or file format"}), 400

        # Crear una nueva instancia de MaintenanceEvidence y asociarla a la actividad
        new_evidence = MaintenanceEvidence(
            activity_id=activity.id,
            evidence_file=file_path
        )

        # Agregar la nueva evidencia a la base de datos
        db.session.add(new_evidence)
        db.session.commit()

        return jsonify({"msg": "Maintenance evidence added successfully"}), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"msg": f"Error adding maintenance evidence: {str(error)}"}), 500


@api.route('/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    try:
        # Obtener el ID del usuario desde el token
        user_id = get_jwt_identity()

        # Buscar al usuario en la base de datos por su ID
        user = User.query.filter_by(id=user_id).first()

        if user:
            # Devolver los datos del perfil del usuario
            return jsonify(user.serialize()), 200
        else:
            return jsonify({"msg": "User not found"}), 404

    except Exception as error:
        return jsonify({"msg": f"Error getting user profile: {str(error)}"}), 500


@api.route('/user/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    try:
        # Obtener el ID del usuario desde el token
        user_id = get_jwt_identity()

        # Buscar al usuario en la base de datos por su ID
        user = User.query.filter_by(id=user_id).first()

        if user:
            # Actualizar los campos del usuario según los datos proporcionados en la solicitud
            data = request.json
            user.name = data.get("name", user.name)
            user.surname = data.get("surname", user.surname)
            user.unit = data.get("unit", user.unit)
            user.emailDCH = data.get("emailDCH", user.emailDCH)
            user.jobPosition = data.get("jobPosition", user.jobPosition)
            user.description = data.get("description", user.description)

            # Guardar los cambios en la base de datos
            db.session.commit()

            # Devolver una respuesta exitosa
            return jsonify({"msg": "User profile updated successfully"}), 200
        else:
            return jsonify({"msg": "User not found"}), 404

    except Exception as error:
        # En caso de error, realizar un rollback y devolver un mensaje de error
        db.session.rollback()
        return jsonify({"msg": f"Error updating user profile: {str(error)}"}), 500


@api.route('/temperatures', methods=['POST'])
def create_temperature():
    try:
        data = request.get_json()
        air_unit = data.get('air_unit')
        temperature = data.get('temperature')
        measurement_time = data.get('measurement_time')
        measurement_date = data.get('measurement_date')

# Verifica si ya existe una temperatura para el mismo aire, fecha y hora
        existing_temperature = Temperature.query.filter_by(
            air_unit=air_unit,
            measurement_time=measurement_time,
            measurement_date=measurement_date
        ).first()

        if existing_temperature:
            return jsonify({'error': 'Ya existe una temperatura registrada para este aire, fecha y hora'}), 400

        new_temperature = Temperature(air_unit=air_unit, temperature=temperature,
                                      measurement_time=measurement_time, measurement_date=measurement_date)

        db.session.add(new_temperature)
        db.session.commit()

        return jsonify({'message': 'Temperature record created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/temperatures', methods=['GET'])
def get_temperatures():
    try:
        temperatures = Temperature.query.all()
        temperature_list = [temperature.serialize()
                            for temperature in temperatures]
        return jsonify({'temperatures': temperature_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/temperatures/latest', methods=['GET'])
def get_latest_temperatures():
    try:
        temperatures = Temperature.query.order_by(
            Temperature.created_at.desc()).limit(10).all()
        temperature_list = [temperature.serialize()
                            for temperature in temperatures]
        return jsonify({'temperatures': temperature_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/temperatures/<int:id>', methods=['GET'])
def get_temperature_by_id(id):
    try:
        temperature = Temperature.query.get(id)
        if temperature:
            return jsonify({'temperature': temperature.serialize()})
        else:
            return jsonify({'message': 'Temperature not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/temperatures/<int:id>', methods=['PUT'])
def update_temperature(id):
    try:
        temperature = Temperature.query.get(id)
        if temperature:
            data = request.get_json()
            temperature.air_unit = data.get('air_unit', temperature.air_unit)
            temperature.temperature = data.get(
                'temperature', temperature.temperature)
            temperature.measurement_time = data.get(
                'measurement_time', temperature.measurement_time)
            temperature.measurement_date = data.get(
                'measurement_date', temperature.measurement_date)

            db.session.commit()

            return jsonify({'message': 'Temperature record updated successfully'})
        else:
            return jsonify({'message': 'Temperature not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/temperatures/<int:id>', methods=['DELETE'])
def delete_temperature(id):
    try:
        temperature = Temperature.query.get(id)
        if temperature:
            db.session.delete(temperature)
            db.session.commit()

            return jsonify({'message': 'Temperature record deleted successfully'})
        else:
            return jsonify({'message': 'Temperature not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/temperature-years', methods=['GET'])
@jwt_required()
def get_temperature_years():
    years = db.session.query(db.extract(
        'year', Temperature.measurement_date)).distinct().all()
    years_list = [year[0] for year in years]
    return jsonify({"years": years_list})


@api.route('/temperature/<int:year>', methods=['GET'])
@jwt_required()
def get_temperature_by_year(year):
    # Filtramos temperaturas por año
    temperatures = Temperature.query.filter(db.extract(
        'year', Temperature.measurement_date) == year).all()

    # Convertimos a un formato para enviar al frontend
    temperatures_data = [
        {
            "year": temperature.measurement_date.year,
            "month": temperature.measurement_date.month,
            "day": temperature.measurement_date.day,
            "air_unit": temperature.air_unit,
            "temperature": temperature.temperature,
            "measurement_time": temperature.measurement_time,
            "id": temperature.id
        }
        for temperature in temperatures
    ]

    return jsonify({"temperatures": temperatures_data})


@api.route('/temperature-by-quarter/<int:year>', methods=['GET'])
@jwt_required()
def get_temperature_by_quarter(year):
    try:
        quarterly_data = {}

        for quarter in range(1, 5):
            # Filtramos temperaturas por trimestre y año
            temperatures = Temperature.query.filter(
                db.extract('year', Temperature.measurement_date) == year,
                db.extract('quarter', Temperature.measurement_date) == quarter
            ).all()

            # Convertimos a un formato para enviar al frontend
            temperatures_data = [
                {
                    "month": temperature.measurement_date.month,
                    "day": temperature.measurement_date.day,
                    "year": temperature.measurement_date.year,
                    "air_unit": temperature.air_unit,
                    "temperature": temperature.temperature,
                    "measurement_time": temperature.measurement_time,
                    "id": temperature.id
                }
                for temperature in temperatures
            ]

            quarterly_data[f'quarter_{quarter}'] = temperatures_data

        return jsonify(quarterly_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/pending-by-units', methods=['POST'])
@jwt_required()
def add_pending_activities():
    try:
        description =request.form.get("description")
        request_date=request.form.get('request_date')
        status=request.form.get('status')
        ticket_associated=request.form.get('ticket_associated')
        finished=request.form.get('finished')

        #Validar los Datos
        if not all ([description,request_date, status, ticket_associated, finished]):
            return jsonify({"msg":"MissingParameters"}), 400
        
        #Crear nueva instancia 
        new_pending_activity= PendingsUnits(
            description=description,
            request_date=request_date,
            status=status,
            ticket_associated=ticket_associated,
            finished=finished)
                
        #Agregar a la base de datos
        db.session.add(new_pending_activity)
        db.session.commit()

        return jsonify({"msg":"Pending Activity successfull register"})
    except Exception as error:
        db.session.rollback()
        return jsonify({"msg":f"Error adding pending activity"})

        