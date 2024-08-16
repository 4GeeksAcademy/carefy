"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Ad, Status
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#### USUARIOS ####

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

    return jsonify(user.serialize())

#Crear nuevo usuario
@api.route("/signup", methods=['POST'])
def add_user():
    data = request.json
    if 'username' not in data or 'email' not in data or 'password' not in data or 'role' not in data:
        return jsonify({'error': 'Missing data'}), 400
    
    hashed_password = generate_password_hash(data['password'])  # Hash the password

    new_user = User(
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
        **new_user.serialize()}), 201

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
@api.route("/login", methods=["POST"])
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
    return jsonify({ "token": access_token, "email":user.email, "username": user.username, 'id': user.id, 'role': user.role  })


#### ANUNCIOS ####

#Crear anuncio
@api.route("/create_ad/<int:user_id>", methods=['POST'])
def create_ad(user_id):
    data = request.json
    if 'max_cost' not in data or 'title' not in data or 'description' not in data:
        return jsonify({'error': 'Missing data'}), 400
    
    if data['status'] not in [status.value for status in Status]:
        return jsonify({'error': 'Invalid status value'}), 400

    new_ad = Ad(
        title=data['title'],
        description=data['description'],
        created_at=data['created_at'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        max_cost=data['max_cost'],
        status=Status(data['status']),
        user_id=user_id
    )

    db.session.add(new_ad)
    db.session.commit()
    
    return jsonify({
        "msg": "Anuncio creado exitosamente",
        **new_ad.serialize()}), 201

#Traer anuncios de un usuario
@api.route('/ads/<int:user_id>', methods=['GET'])
def get_users_ads(user_id):
    ads = Ad.query.filter_by(user_id=user_id).all()
    
    if not ads:
        return jsonify({'error': 'No ads found for this user'}), 404

    ads_serialized = [ad.serialize() for ad in ads]
    
    return jsonify(ads_serialized), 200

#Eliminar anuncios
@api.route('/ad/delete/<int:ad_id>', methods=['DELETE'])
def delete_user_ad(ad_id):
    ad = Ad.query.get(ad_id)

    if ad is None:
        return jsonify({"message": "Ad not found"}), 400

    try:
        db.session.delete(ad)
        db.session.commit()
        return jsonify({"message": "Ad deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#Traer data de un solo anuncio
@api.route('/ad/user/<int:ad_id>', methods=['GET'])
def get_user_ad(ad_id):
    ad = Ad.query.get(ad_id)
    if ad is None:
        return jsonify({'error': 'Ad not found'}), 404

    return jsonify(ad.serialize())

#Página privada/protegida, solo accesible con token
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id }), 200

