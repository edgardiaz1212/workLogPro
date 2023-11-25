from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20),nullable=False)
    surname=db.Column(db.String(20),nullable=False)
    unit=db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    emailDCH= db.Column(db.String(120), unique=True, nullable=False)
    jobPosition=db.Column(db.String(120), nullable=False)
    description=db.Column(db.String(120))
    password = db.Column(db.String(255), unique=False, nullable=False)
    salt = db.Column(db.String(100), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "unit": self.unit,
            "email": self.email,
            "emailDCH": self.emailDCH,
            "jobPosition": self.jobPosition,
            "description": self.description,
            # do not serialize the password, its a security breach
        }