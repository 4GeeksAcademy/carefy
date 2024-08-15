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
    name =  db.Column(db.String(250), nullable=False)
    lastname = db.Column(db.String(250), nullable=False)
    phone = db.Column(db.String(250), nullable=False)
    photo = db.Column(db.String(250), nullable=False)
    description =db.Column(db.String(250), nullable=False)
    birthdate = db.Column(db.String(250), nullable=False)
    dependency = db.Column(db.String(250), nullable=False)
    location =  db.Column(db.String(250), nullable=False)
    province = db.Column(db.String(250), nullable=False)
    availability = db.Column(db.String(250), nullable=False) 
    tags = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    def __repr__(self):
        return f'<Patient {self.name} {self.lastname}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "phone": self.phone,
            "photo": self.photo,
            "description": self.description,
            "age": self.age,
            "dependency": self.dependency,
            "location": self.location,
            "province": self.province,
            "availability": self.availability,
            "tags": self.tags
        }
        
class Companion(db.Model):
    __tablename__ ='companions'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(250), nullable=False)
    photo = db.Column(db.String(250), nullable=False)
    location =  db.Column(db.String(250), nullable=False)
    province = db.Column(db.String(250), nullable=False)
    availability_hours = db.Column(db.Boolean, default=False)
    availability_days = db.Column(db.Boolean, default=False)
    availability_weeks = db.Column(db.Boolean, default=False)
    availability_live_in = db.Column(db.Boolean, default=False)
    experience = db.Column(db.String(250), nullable=False)
    service_cost = db.Column(db.Integer, nullable=False)
    facebook = db.Column(db.String(250))
    instagram = db.Column(db.String(250))
    twitter = db.Column(db.String(250)) 
    linkedin = db.Column(db.String(250))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Inscription(db.Model): 
    __tablename__ ="inscriptions"
    id = db.Column(db.Integer, primary_key=True)
    patient_id =db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    companion_id =db.Column(db.Integer, db.ForeignKey('companions.id'), nullable=False)
    ad_id =db.Column(db.Integer,  db.ForeignKey('ads.id'), nullable=False)
    is_active =db.Column(db.Boolean(), nullable=False) 

    companions = db.relationship("Companion", backref = "inscriptions")
    patients = db.relationship ("Patient",  backref = "inscriptions")
    ad = db.relationship ("Ad", backref = "inscriptions")

    def serialize(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "companion_id": self.companion_id,
            "ad_id": self.ad_id,
            "is_active": self.is_active
        }
    

class Favourite_companion(db.Model):
    __tablename__ ="favourite_companions"
    id = db.Column(db.Integer, primary_key=True)
    patient_id =db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    companion_id =db.Column(db.Integer, db.ForeignKey('companions.id'), nullable=False)

    patient = db.relationship ("Patient", backref="favourite_companions")
    companion = db.relationship ("Companion", backref = "favourite_companions")

    def serialize(self):
        return{
            "id": self.id,
            "patient_id": self.patient_id,
            "companion_id": self.companion_id
        }
        
class Status(Enum):
    PENDING = "pending"
    REJECTED = "rejected"
    OK = "ok"
    

class Ad (db.Model):
    __tablename__ ="ads"
    id = db.Column(db.Integer, primary_key=True)
    patient_id =db.Column(db.Integer, db.ForeignKey('patients.id'))
    title = db.Column(db.String(120),)
    description = db.Column(db.Text)
    active =db.Column(db.Boolean(), default=True) 
    created_at = db.Column(db.Date)
    start_date = db.Column(db.Date)
    end_date =  db.Column(db.Date)
    max_cost =db.Column(db.Integer)
    status = db.Column(db.Enum(Status))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


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
            "status": self.status.value if self.status else None,  # Convertimos a cadena aquí
            "user_id": self.user_id
        }






