from extension import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(80), unique=True, nullable=False)
    second_name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    sex = db.Column(db.String(10), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    patient = db.relationship('Patient', backref='user', uselist=False, lazy=True)
    radiology_reports = db.relationship('RadiologyReport', backref='user', lazy=True)
    doctor_advices = db.relationship('DoctorAdvice', backref='user', lazy=True)

class Patient(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    disease_status = db.Column(db.String(50))

class RadiologyReport(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    radiopath = db.Column(db.String(200))

class DoctorAdvice(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    advice = db.Column(db.String(200))
    date = db.Column(db.Date, nullable=False)
