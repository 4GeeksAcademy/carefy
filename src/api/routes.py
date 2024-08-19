"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Patient, Ad, Status, Type
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
@api.route("/create_ad/<int:user_id>/<int:patient_id>", methods=['POST'])
def create_ad(user_id, patient_id):
    data = request.json
    if 'max_cost' not in data or 'title' not in data or 'description' not in data:
        return jsonify({'error': 'Missing data'}), 400
    
    if data['status'] not in [status.value for status in Status]:
        return jsonify({'error': 'Invalid status value'}), 400
    
    if data['type'] not in [type.value for type in Type]:
        return jsonify({'error': 'Invalid type value'}), 400

    new_ad = Ad(
        title=data['title'],
        description=data['description'],
        created_at=data['created_at'],
        type=Type(data['type']),
        start_date=data['start_date'],
        end_date=data['end_date'],
        max_cost=data['max_cost'],
        status=Status(data['status']),
        patient_id=patient_id,
        user_id=user_id
        
    )

    db.session.add(new_ad)
    db.session.commit()
    
    return jsonify({
        "msg": "Anuncio creado exitosamente",
        **new_ad.serialize()}), 201

# Traer todos los anuncios
@api.route('/ads', methods=['GET'])
def get_ads():
    ads = Ad.query.all()
    return jsonify([ad.serialize() for ad in ads])

#Traer anuncio de un usuario
@api.route('/ads/<int:user_id>', methods=['GET'])
def get_users_ads(user_id):
    ads = Ad.query.filter_by(user_id=user_id).all()
    
    if not ads:
        return jsonify({'error': 'No ads found for this user'}), 404

    ads_serialized = [ad.serialize() for ad in ads]
    
    return jsonify(ads_serialized), 200

#Eliminar anuncio
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

#Editar anuncio
@api.route('/ad/edit/<int:ad_id>', methods=['PUT'])
def edit_ad(ad_id):
    ad = Ad.query.filter_by(id=ad_id).first()
    # Verificar si el anuncio existe
    if ad is None:
        return jsonify({"message": "Ad not found"}), 404

    data = request.json

    # Verificar si se enviaron datos
    if not data:
        return jsonify({"message": "No data provided"}), 400

 # Actualizar el Anuncio con los nuevos datos
    try:
        if 'title' in data:
            ad.title = data['title'] 
        if 'description' in data:
            ad.description = data['description']
        if 'type' in data:
            ad.type = Type(data['type'])
        if 'start_date' in data:
            ad.start_date = data['start_date']
        if 'end_date' in data:
            ad.end_date = data['end_date']
        if 'max_cost' in data:
            ad.max_cost = data['max_cost']
        if 'patient_id' in data:
            ad.patient_id = data['patient_id']

        db.session.commit()  # Guarda los cambios en la base de datos

        return jsonify({"message": "Ad actualizado correctamente", "Ad": ad.serialize()}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500

#Página privada/protegida, solo accesible con token
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id }), 200



@api.route("/anadir_familiar", methods=["POST"])
def anadir_familiar():
    data = request.json

    campos_requeridos = ['name', 'alias', 'lastname', 'phone' , 'description', 'birthdate', 'dependency', 'province', 'location']

    for campos in campos_requeridos:
        if campos not in data:
            return jsonify ({'ERROR' : "falta el campo requerido: {campos}"}), 400        
        elif (data):
            nuevo_familiar = Patient(
                name = data ['name'],
                alias = data ['alias'],
                lastname = data ['lastname'],
                phone = data ['phone'],
                description = data ['description'],
                birthdate = data ['birthdate'],
                dependency = data ['dependency'],
                province = data ['province'],
                location = data ['location'],
                photo = data ['photo'],
                user_id = data ['user_id']
            )

            db.session.add(nuevo_familiar)
            db.session.commit()

            return jsonify({
                "msg": "Familiar creado exitosamente",
                'id': nuevo_familiar.id,
                "name" : nuevo_familiar.name,
                "alias": nuevo_familiar.alias,
                "lastname" : nuevo_familiar.lastname,
                "phone": nuevo_familiar.phone,
                "description": nuevo_familiar.description,
                "birthdate" : nuevo_familiar.birthdate,
                "dependency": nuevo_familiar.dependency,
                "province" : nuevo_familiar.province, 
                "location": nuevo_familiar.location,
                "photo" : nuevo_familiar.photo,
                "user_id": nuevo_familiar.user_id
            }), 200
        return jsonify ({'Error' : 'error al anadir nuevo familiar'}), 400
    

# Tenemos que obtener los familiares según el usuario que está logueado.
# Reibe por parámetro el id del usuario. 
# Se declara familiares que guarda la busqueda en la clase Patient, que filtra a su 
# vez los familiares por el user_id (el valor del atributo que recibe tiene que ser
# igual al que tiene en el endpoint).
# Tras comprobar se hace un for para serlalizar uno a uno los familiares
# y los guarda en familiares_serialize. 
@api.route('/user/<int:user_id>/fam_user', methods=['GET'])
def get_familiar_detalles(user_id):
    familiares = Patient.query.filter_by(user_id=user_id).all()
    if familiares is None:
        return jsonify({'error': 'Patient not found'}), 404
    
    familiares_serialize = [familiar.serialize() for familiar in familiares]
    
    return jsonify(familiares_serialize)


#Para editar el formulario de un familiar que ya existe previamente. 
@api.route ('/user/<int:id>/edit_fam_user', methods=['PUT'])
def editar_familiar(id):
    familiar = Patient.query.filter_by(id=id).first()
    if familiar is None:
        return jsonify({'error': 'Patient not found'}), 404
    
    data = request.json

    if not data:
        return jsonify ({'error' : 'No data provided'}), 400
    
    try:
        if 'alias' in data:
            familiar.alias = data['alias']
        if 'name' in data:
            familiar.name = data['name']
        if 'lastname' in data:
            familiar.lastname = data['lastname']
        if 'phone' in data:
            familiar.phone = data['phone']
        if 'description' in data:
            familiar.description = data['description']
        if 'birthdate' in data:
            familiar.birthdate = data['birthdate']
        if 'dependency' in data:
            familiar.dependency = data['dependency']
        if 'province' in data:
            familiar.province = data['province']
        if 'location' in data:
            familiar.location = data['location']
        if 'photo' in data:
            familiar.photo = data['photo']
        
        db.session.commit()
        return jsonify({"message": "Familiar actualizado correctamente", "familiar": familiar.serialize()}), 200
    
    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500


@api.route ('/user/<int:id>/delete_fam_user', methods=['DELETE'])
def eliminar_familiar(id):
    familiar = Patient.query.filter_by(id=id).first()
    if familiar is None:
        return jsonify({'error': 'Patient not found'}), 404
    
    
    try:
        db.session.delete(familiar)
        db.session.commit()
        return jsonify({"message": "Familiar eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
        
        
    
    