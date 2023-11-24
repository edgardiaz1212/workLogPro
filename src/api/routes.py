"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

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
