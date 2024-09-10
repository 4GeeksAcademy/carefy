"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Patient, Ad, Status, Type, Companion, Favorite_companion, Inscription, Favorite_ad, Rating
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
import cloudinary
import cloudinary.uploader
from flask_mail import Message
from api.mail.mailer import send_email


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
    users = User.query.filter_by(email=email).first()
    
    if users is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad username or password"}), 404

    if not check_password_hash(users.password, password):
        # Incorrect password
        return jsonify({"msg": "Bad username or password"}), 403
    
    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=users.id)
    
    if users.role == 'companion':
        print('-------------------------------------------------------------')
        companion = Companion.query.filter_by(user_id=users.id).first()
        print(companion)
        return jsonify({ "token": access_token, "email":users.email, "username": users.username, 'id': users.id, 'role': users.role, "companion": companion.serialize()  }) 
    
    return jsonify({ "token": access_token, "email":users.email, "username": users.username, 'id': users.id, 'role': users.role })


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
        if 'hired' in data:
            ad.hired = data['hired']

        db.session.commit()  # Guarda los cambios en la base de datos

        return jsonify({"message": "Ad actualizado correctamente", "Ad": ad.serialize()}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500
    
    
 #Editar estado de anuncio
@api.route('/ad/edit/status/<int:ad_id>', methods=['PUT'])
def edit_ad_status(ad_id):
    ad = Ad.query.filter_by(id=ad_id).first()
    # Verificar si el anuncio existe
    if ad is None:
        return jsonify({"message": "Ad not found"}), 404

    data = request.json

    # Verificar si se enviaron datos
    if not data:
        return jsonify({"message": "No data provided"}), 400

 # Actualizar el Anuncio con el nuevo estado
    try:
        if 'status' in data:
            ad.status = Status[data['status'].upper()]
    
        db.session.commit()  # Guarda los cambios en la base de datos

        return jsonify({"message": "Ad actualizado correctamente", "ad": ad.serialize()}), 200

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
    print('datos añadir familiar', data)

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


# Traer todos los anuncios
@api.route('/familiares', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([patient.serialize() for patient in patients])

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
        
        
### ACOMPANANTE ###

#Ver todos los acompañantes
@api.route("/get_companions", methods=["GET"])
def get_companions():
    companions = Companion.query.all()
    return jsonify([companion.serialize() for companion in companions])

#Ver un acompañante
@api.route('/companion/<int:id>', methods=['GET'])
def companion(id):
    # Obtener el acompañante por ID
    companion = Companion.query.get(id)
    
    if companion is None:
        # Si no se encuentra el acompañante, devolver un error 404
        return jsonify({"error": f"Companion with ID {id} not found"})
    
    # Serializar los datos del acompañante y devolverlos en formato JSON
    return jsonify(companion.serialize())

    
#Crear acompañante
@api.route("/anadir_companion", methods=["POST"])
def anadir_companion():
    data = request.json

    # Verificamos que 'user_id' está presente en la solicitud
    if 'user_id' not in data:
        return jsonify({'ERROR': "Falta el campo requerido: user_id"}), 400

    # Creamos una nueva instancia de Companion solo con 'user_id'
    nuevo_companion = Companion(
        user_id=data['user_id'],
        is_active = True
        )

    # Guardamos el nuevo Companion en la base de datos
    try:
        db.session.add(nuevo_companion)
        db.session.commit()

        # Respondemos con los datos básicos del Companion creado
        return jsonify({
            "msg": "Companion creado exitosamente",
            'id': nuevo_companion.id,
            'user_id': nuevo_companion.user_id
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f'Error al añadir nuevo companion: {str(e)}')
        return jsonify({'Error': f'Error al añadir nuevo companion: {str(e)}'}), 400


@api.route("/actualizar_companion/<int:id>", methods=["PUT"])
def actualizar_companion(id):
    data=request.json
    print(data)

    # Verificar que el Companion existe
    companion = Companion.query.get(id)
    if not companion:
        return jsonify({"Error":"El companion no existe"}),404
    
    # Actualizamos los campos si están presentes en la solicitud
    companion.description = data.get('description', companion.description)  # Si se proporciona 'description' en los datos de la solicitud, se usa ese valor; si no, se mantiene el valor actual.
    companion.photo = data.get('photo', companion.photo)
    companion.province = data.get('province', companion.province)
    companion.birthdate = data.get('birthdate', companion.birthdate)
    companion.availability_hours = data.get('availability_hours', companion.availability_hours)
    companion.availability_days = data.get('availability_days', companion.availability_days)
    companion.availability_weeks = data.get('availability_weeks', companion.availability_weeks)
    companion.availability_live_in = data.get('availability_live_in', companion.availability_live_in)
    companion.experience = data.get('experience', companion.experience)
    companion.service_cost = data.get('service_cost', companion.service_cost)
    companion.facebook = data.get('facebook', companion.facebook)
    companion.instagram = data.get('instagram', companion.instagram)
    companion.twitter = data.get('twitter', companion.twitter)
    companion.linkedin = data.get('linkedin', companion.linkedin)
    
    # Guardamos los cambios en la base de datos
    try:
        db.session.commit()
        return jsonify({
            "msg": "Companion actualizado exitosamente",
            "companion": companion.serialize()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"ERROR": f"Ocurrió un error al actualizar el companion: {str(e)}"}), 500
 
#Editar is_activa de acompañante
@api.route('/companion/edit/is_active/<int:companion_id>', methods=['PUT'])
def edit_active_companion(companion_id):
    companion = Companion.query.filter_by(id=companion_id).first()
    # Verificar si el anuncio existe
    if companion is None:
        return jsonify({"message": "Companion not found"}), 404

    data = request.json

    # Verificar si se enviaron datos
    if not data:
        return jsonify({"message": "No data provided"}), 400

 # Actualizar el Anuncio con los nuevos datos
    try:
        if 'is_active' in data:
            companion.is_active = data['is_active'] 

        db.session.commit()  # Guarda los cambios en la base de datos

        return jsonify({"message": "Companion is_active actualizado correctamente", "companion": companion.serialize()}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500 
 
 
 
#Eliminar companion
@api.route('/companion/delete/<int:companion_id>', methods=['DELETE'])
def delete_companion(companion_id):
    companion = Companion.query.get(companion_id)

    if companion is None:
        return jsonify({"message": "Companion not found"}), 400

    try:
        db.session.delete(companion)
        db.session.commit()
        return jsonify({"message": "Companion deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500   

#FAVORITOS COMPANIONS

# Mostrar todos los favoritos
@api.route('/favorite_companion', methods=['GET'])
def get_fav():
    favs = Favorite_companion.query.all()
    return jsonify([fav.serialize() for fav in favs])   

#Traer favoritos de un usuario
@api.route('/favorite_companion/<int:user_id>', methods=['GET'])
def get_users_favs(user_id):
    favs = Favorite_companion.query.filter_by(user_id=user_id).all()
    
    if not favs:
        return jsonify({'error': 'No favs found for this user'}), 404

    favs_serialized = [fav.serialize() for fav in favs]
    
    return jsonify(favs_serialized), 200

#Guardar favorito
@api.route("/favorite_companion/add/<int:companion_id>/<int:user_id>", methods=['POST'])
def add_fav(companion_id,user_id):
    data = request.json
    if 'companion_id' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_fav = Favorite_companion(
        companion_id=companion_id,
        user_id=user_id  
    )

    db.session.add(new_fav)
    db.session.commit()
    
    return jsonify({
        "msg": "Favorito guardado exitosamente",
        **new_fav.serialize()}), 201

#Eliminar favorito
@api.route('/favorite_companion/delete/<int:fav_id>', methods=['DELETE'])
def delete_fav(fav_id):
    fav = Favorite_companion.query.get(fav_id)

    if fav is None:
        return jsonify({"message": "Favorite not found"}), 400

    try:
        db.session.delete(fav)
        db.session.commit()
        return jsonify({"message": "Favorite deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#FAVORITOS ADS

# Mostrar todos los favoritos
@api.route('/favorite_ad', methods=['GET'])
def get_fav_ad():
    favs = Favorite_ad.query.all()
    return jsonify([fav.serialize() for fav in favs])   

#Traer favoritos de un usuario
@api.route('/favorite_ad/<int:user_id>', methods=['GET'])
def get_users_favs_ad(user_id):
    favs = Favorite_ad.query.filter_by(user_id=user_id).all()
    
    if not favs:
        return jsonify({'error': 'No favs found for this user'}), 404

    favs_serialized = [fav.serialize() for fav in favs]
    
    return jsonify(favs_serialized), 200

#Guardar favorito
@api.route("/favorite_ad/add/<int:ad_id>/<int:user_id>", methods=['POST'])
def add_fav_ad(ad_id,user_id):
    data = request.json
    if 'ad_id' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_fav = Favorite_ad(
        ad_id=ad_id,
        user_id=user_id  
    )

    db.session.add(new_fav)
    db.session.commit()
    
    return jsonify({
        "msg": "Favorito guardado exitosamente",
        **new_fav.serialize()}), 201

#Eliminar favorito
@api.route('/favorite_ad/delete/<int:fav_id>', methods=['DELETE'])
def delete_fav_ad(fav_id):
    fav = Favorite_ad.query.get(fav_id)

    if fav is None:
        return jsonify({"message": "Favorite not found"}), 400

    try:
        db.session.delete(fav)
        db.session.commit()
        return jsonify({"message": "Favorite deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#SUBIR FOTO CLOUDINARY

@api.route('/subirfoto', methods=['POST'])
def subirfoto():
    file_to_upload = request.files['file']
    if file_to_upload:
        upload = cloudinary.uploader.upload(file_to_upload)
        print('-------------la url donde esta la imagen-------------', upload)
        return jsonify(upload)
    return jsonify({"error": "No file uploaded"}), 400






#VALORACIONES Y RESEÑAS

# Traer todos las reseñas
@api.route('/rates', methods=['GET'])
def get_rates():
    rates = Rating.query.all()
    return jsonify([rate.serialize() for rate in rates])


#Crear nuevo usuario
@api.route("/add_rate/<int:companion_id>", methods=['POST'])
def add_rate(companion_id):
    data = request.json
    if 'rate' not in data or 'review' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_rating = Rating(
        rate=data['rate'],
        review=data['review'],
        companion_id=companion_id,
        user_id=data['user_id']
    )

    db.session.add(new_rating)
    db.session.commit()
    
    return jsonify({
        "msg": "Reseña creada exitosamente",
        **new_rating.serialize()}), 201

#Traer reseñas de un solo usuario
@api.route('/rates/<int:companion_id>', methods=['GET'])
def get_companion_rates(companion_id):
    rates = Rating.query.filter_by(companion_id=companion_id).all()
    if not rates:
        return jsonify({'error': 'Rate not found'}), 404

    # Serializa cada rate en la lista
    rates_serialized = [rate.serialize() for rate in rates]
    return jsonify(rates_serialized)

@api.route('/token', methods=['GET'])
@jwt_required()
def check_jwt():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify({'success': True, 'user': user.serialize()}), 200
    return jsonify({'success': False, 'msg': 'Bad token'}), 401




######### INSCRIPCIONES ##########

 #### RECUPERAR CONTRASENA ###



## Enviar email para resetear contraseña
@api.route("/check_mail", methods=['POST'])
def check_mail():
    try:
        data = request.json
        print(data)
        user = User.query.filter_by(email=data['email']).first()
        print(user)
        if not user:
            return jsonify({'success': False, 'msg': 'email not found'}),404
        token = create_access_token(identity=user.id)
        result = send_email(data['email'], token)
        print(result)
        return jsonify({'success': True, 'token': token, 'email': data['email']}), 200
    except Exception as e:
        print('error: '+ e)
        return jsonify({'success': False, 'msg': 'something went wrong'})
    
## Resetear contraseña

@api.route('/password_update', methods=['PUT'])
@jwt_required()
def password_update():
    try:
        data = request.json
        id = get_jwt_identity()
        user = User.query.get(id)
        hashed_password = generate_password_hash(data['password'])  # Hash the password
        user.password = hashed_password
        db.session.commit()
        return jsonify({'success': True, 'msg': 'Contraseña actualizada exitosamente, intente iniciar sesion'}), 200
    except Exception as e:
        db.session.rollback()
        print('error: '+ e)
        return jsonify({'success': False, 'msg': 'something went wrong'})
# Nuevo crear inscripción desde acompañante botón POSTULARSE
@api.route("/inscripcion/add/<int:companion_id>/<int:ad_id>/<int:user_id>", methods=['POST'])
def add_inscription(companion_id, ad_id, user_id):

    new_inscription = Inscription(
        companion_id = companion_id,
        ad_id = ad_id,
        user_id = user_id,
        statusContract = 'PENDING',
        is_active = True
    )
    db.session.add(new_inscription)
    db.session.commit()

    return jsonify({
        "msg": "inscripcion creada correctamente",
        **new_inscription.serialize()}), 201

#  borrar inscripcion
@api.route('inscripcion/delete/<int:inscription_id>', methods=['DELETE'])
def delete_inscription(inscription_id):
    inscription = Inscription.query.get(inscription_id)

    if inscription is None:
        return jsonify ({'message': 'Inscripción no encontrada'}), 400
    
    try:     
        db.session.delete(inscription)
        db.session.commit()
        return jsonify({"message":"Inscripcion borrada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/obtenerinscripciones', methods=['GET'])
def obtenerinscripciones():
    postulantes = Inscription.query.all()
    return jsonify([postulante.serialize() for postulante in postulantes])


# Para modificar el estado de la contratación de la inscripción 
@api.route('/inscripcion/edit/<int:inscription_id>', methods=['PUT'])
def editar_inscripcion(inscription_id):
    data=request.json
    inscripcion = Inscription.query.get(inscription_id)
    if not inscripcion:
        return jsonify({"Error":"La inscripción no existe"}),404
     
    inscripcion.statusContract = data.get('statusContract', inscripcion.statusContract)

    try:
        db.session.commit()
        return jsonify({
            "msg": "Inscripción actualizado exitosamente",
            "Inscripción": inscripcion.serialize()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"ERROR": f"Ocurrió un error al actualizar la Inscripción: {str(e)}"}), 500
        
    

 
