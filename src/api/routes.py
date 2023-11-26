"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Activity
from api.utils import generate_sitemap, APIException
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


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
            actividad_satisfactoria=data.get('actividad_satisfactoria')
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
