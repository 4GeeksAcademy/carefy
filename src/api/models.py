from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Inscriptions(db.Model): 
    __tablename__ ="Inscriptions"
    id = db.Column(db.Integer, primary_key=True)
    patient_id =db.Column(db.Integer, db.ForeignKey('Patients.id'), nullable=True)
    companion_id =db.Column(db.Integer, db.ForeignKey('Companions.id'), nullable=True)
    ad_id =db.Column(db.Integer,  db.ForeignKey('Ads.id'), unique=False, nullable=True)
    is_active =db.Column(db.Boolean(), unique=False, nullable=True) 

    companions = db.relationship("Companions", back_populates="inscriptions")
    patients = db.relationship ("Patients",  back_populates = "inscriptions")
    ad = db.relationship ("Ads", back_populates = "inscriptions")


class Favourite_companions(db.Model):
    __tablename__ ="Favourite_companions"
    id = db.Column(db.Integer, primary_key=True)
    patient_id =db.Column(db.Integer, db.ForeignKey('Patients.id'), nullable=False)
    companion_id =db.Column(db.Integer, db.ForeignKey('Companions.id'), nullable=False)

    patient = db.relationship ("Patients", back_populates="favourite_companions")
    companion = db.relationship ("Companions", back_populate = "favourite_companions")

class Ads (db.Model):
    __tablename__ ="Ads"
    id = db.Column(db.Integer, primary_key=True)
    patient_id =db.Column(db.Integer, db.ForeignKey('Patients.id'), nullable=False)
    title = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text(350), unique=True, nullable=False)
    active =db.Column(db.Boolean(), unique=False, nullable=False) 
    created_at = db.Column(db.Date, unique=False, nullable=False)
    start_date = db.Column(db.Date, unique=False, nullable=False)
    end_date =  db.Column(db.Date, unique=False, nullable=False)
    max_cost =db.Column(db.Integer, unique=False, nullable=False)
    status = db.Column(db.Enum, unique=False, nullable=False)

    patient = db.relationship ("Patients", back_populates="ads")






