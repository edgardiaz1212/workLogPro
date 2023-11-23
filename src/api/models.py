from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20),nullable=False)
    surname=db.Column(db.String(20),nullable=False)
    unit=db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    email_dch= db.Column(db.String(120), unique=True, nullable=False)
    job_position=db.Column(db.String(120), nullable=False)
    description=db.Column(db.String(120))
    password = db.Column(db.String(80), unique=False, nullable=False)
    

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "unit": self.unit,
            "email": self.email,
            "email_dch": self.email_dch,
            "job_position": self.job_position,
            "description": self.description,
            # do not serialize the password, its a security breach
        }