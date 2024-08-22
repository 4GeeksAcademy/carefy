from flask_sqlalchemy import SQLAlchemy
from enum import Enum


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), default=True)
    name = db.Column(db.String(250))
    lastname = db.Column(db.String(250)) 
    phone = db.Column(db.String(250)) 
    location = db.Column(db.String(250))
    role = db.Column(db.String(250), nullable=False)
    
    patients = db.relationship('Patient', backref='user')
    companions = db.relationship('Companion', backref='user')
    ads = db.relationship('Ad', backref='user')

    def __repr__(self):
        return f'{self.id}'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
            "name": self.name,
            "lastname": self.lastname,
            "phone": self.phone,
            "location": self.location,
            "role": self.role
        }
    
class Patient(db.Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    alias = db.Column(db.String(50), nullable=False)
    name =  db.Column(db.String(250), nullable=False)
    lastname = db.Column(db.String(250), nullable=False)
    phone = db.Column(db.String(250), nullable=False)
    photo = db.Column(db.String(250))
    description = db.Column(db.Text)
    birthdate = db.Column(db.String(250), nullable=False)
    dependency = db.Column(db.String(250), nullable=False)
    location =  db.Column(db.String(250), nullable=False)
    province = db.Column(db.String(250))
    availability = db.Column(db.String(250)) 
    tags = db.Column(db.String(250))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    def __repr__(self):
        return f'{self.id}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "alias": self.alias,
            "lastname": self.lastname,
            "phone": self.phone,
            "photo": self.photo,
            "description": self.description,
            "birthdate": self.birthdate,
            "dependency": self.dependency,
            "location": self.location,
            "province": self.province,
            "availability": self.availability,
            "tags": self.tags
        }
        
class Companion(db.Model):
    __tablename__ ='companions'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    photo = db.Column(db.String(250), nullable=False)
    rating = db.Column(db.Integer)
    province = db.Column(db.String(250), nullable=False)
    birthdate = db.Column(db.String(250), nullable=False)
    availability_hours = db.Column(db.Boolean, default=False)
    availability_days = db.Column(db.Boolean, default=False)
    availability_weeks = db.Column(db.Boolean, default=False)
    availability_live_in = db.Column(db.Boolean, default=False)
    experience = db.Column(db.Text, nullable=False)
    service_cost = db.Column(db.Integer, nullable=False)
    facebook = db.Column(db.String(250))
    instagram = db.Column(db.String(250))
    twitter = db.Column(db.String(250)) 
    linkedin = db.Column(db.String(250))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    hired = db.relationship('Ad', backref='hired_companion')


    def __repr__(self):
        return f'{self.id}'
    
    def serialize(self):
        return {
            "id": self.id,
            "photo": self.photo,
            "description": self.description,
            "rating": self.rating,
            "birthdate": self.birthdate,
            "province": self.province,
            "availability_hours": self.availability_hours,
            "availability_days": self.availability_days,
            "availability_weeks": self.availability_weeks,
            "availability_live_in": self.availability_live_in,
            "experience": self.experience,
            "service_cost": self.service_cost,
            "facebook": self.facebook,
            "instagram": self.instagram,
            "twitter": self.twitter,
            "linkedin": self.linkedin,
            "user": {
                "id": self.user.id,
                "name": self.user.name,
                "lastname": self.user.lastname,
                "email": self.user.email,
                "phone": self.user.phone,
                "location": self.user.location,
            } if self.user else None,  #así se asegura que el usuario existe
        }


class Inscription(db.Model): 
    __tablename__ ="inscriptions"
    id = db.Column(db.Integer, primary_key=True)
    user_id =db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    companion_id =db.Column(db.Integer, db.ForeignKey('companions.id'), nullable=False)
    ad_id =db.Column(db.Integer,  db.ForeignKey('ads.id'), nullable=False)
    is_active =db.Column(db.Boolean(), nullable=False) 

    companions = db.relationship("Companion", backref = "inscriptions")
    users = db.relationship ("User",  backref = "inscriptions")
    ad = db.relationship ("Ad", backref = "inscriptions")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "companion_id": self.companion_id,
            "ad_id": self.ad_id,
            "is_active": self.is_active
        }
    

class Favorite_companion(db.Model):
    __tablename__ ="favorite_companions"
    id = db.Column(db.Integer, primary_key=True)
    user_id =db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    companion_id =db.Column(db.Integer, db.ForeignKey('companions.id'), nullable=False)

    user = db.relationship ("User", backref="favorite_companions")
    companion = db.relationship ("Companion", backref = "favorite_companions")
    
    def __repr__(self):
        return f'{self.id}'

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "companion_id": self.companion_id,
            "companion": self.companion.serialize() if self.companion else None,
            "user": self.user.serialize() if self.user else None
        }
        
class Favorite_ad(db.Model):
    __tablename__ ="favorite_ads"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ad_id = db.Column(db.Integer, db.ForeignKey('ads.id'), nullable=False)

    user = db.relationship ("User", backref="favorite_ads")
    ad = db.relationship ("Ad", backref = "favorite_ads")
    
    def __repr__(self):
        return f'{self.id}'

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "ad_id": self.ad_id,
            "ad": self.ad.serialize() if self.ad else None,
            "user": self.user.serialize() if self.user else None
        }
        
        
class Status(Enum):
    PENDING = "pending"
    REJECTED = "rejected"
    OK = "ok"
    FINISH = "finish"
    
class Type(Enum):
    OUT = "externo"
    IN = "interno"
    

class Ad (db.Model):
    __tablename__ ="ads"
    id = db.Column(db.Integer, primary_key=True)
    patient_id =db.Column(db.Integer, db.ForeignKey('patients.id'))
    title = db.Column(db.String(120),)
    description = db.Column(db.Text)
    active =db.Column(db.Boolean(), default=True) 
    created_at = db.Column(db.Date)
    type=db.Column(db.Enum(Type))
    start_date = db.Column(db.Date)
    end_date =  db.Column(db.Date)
    max_cost =db.Column(db.Integer)
    status = db.Column(db.Enum(Status))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    hired = db.Column(db.Integer, db.ForeignKey('companions.id'))
    
    patients = db.relationship('Patient', backref='ad')
    
    def __repr__(self):
        return f'{self.id}'

    def serialize(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "title": self.title,
            "description": self.description,
            "active": self.active,
            "created_at": self.created_at,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "max_cost": self.max_cost,
            "status": self.status.value if self.status else None,
            "type": self.type.value if self.type else None,
            "user_id": self.user_id,
            "hired": self.hired 
        }