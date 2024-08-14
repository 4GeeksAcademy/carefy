"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Traer todos los usuarios
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

#Traer data de un solo usuario
@api.route('/user/<int:user_id>', methods=['GET'])
def get_users_details(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    usuario = {
        'id': user.id,
        'name': user.name,
        'lastname': user.lastname,
        'email': user.email,
        'phone': user.phone,
        'location': user.location
    }
    return jsonify(usuario)

#Crear nuevo usuario
@api.route("/signup", methods=['POST'])
def add_user():
    data = request.json
    if 'username' not in data or 'email' not in data or 'password' not in data or 'role' not in data:
        return jsonify({'error': 'Missing data'}), 400
    
    hashed_password = generate_password_hash(data['password'])  # Hash the password

    new_user = User(
        id=data['id'],
        username=data['username'],
        email=data['email'],
        role=data['role'],
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()
        # Crear un token de acceso
    access_token = create_access_token(identity=new_user.id)
    
    return jsonify({
        "msg": "Usuario creado exitosamente",
        "access_token": access_token,
        'id': new_user.id,
        'username': new_user.username,
        'email': new_user.email,
        'role': new_user.role}), 201

#Editar usuario existente
@api.route('/users/edit/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    user = User.query.get(user_id)
    # Verificar si el usuario existe
    if user is None:
        return jsonify({"message": "User not found"}), 404

    data = request.json  # Obtén los datos del cuerpo de la solicitud

    # Verificar si se enviaron datos
    if not data:
        return jsonify({"message": "No data provided"}), 400

 # Actualizar el usuario con los nuevos datos
    try:
        if 'name' in data:
            user.name = data['name'] 
        if 'lastname' in data:
            user.lastname = data['lastname'] 
        if 'email' in data:
            user.email = data['email']
        if 'phone' in data:
            user.phone = data['phone']
        if 'location' in data:
            user.location = data['location']

        db.session.commit()  # Guarda los cambios en la base de datos

        return jsonify({"message": "User updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500

#Logearte y crear token de acceso
@api.route("/login", methods=["POST", "GET"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.query.filter_by(email=email).first()

    if user is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad username or password"}), 401

    if not check_password_hash(user.password, password):
        # Incorrect password
        return jsonify({"msg": "Bad username or password"}), 401

    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id, "email":user.email, "username": user.username, 'userId': user.id, 'role': user.role  })

#Página privada/protegida, solo accesible con token
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id }), 200

