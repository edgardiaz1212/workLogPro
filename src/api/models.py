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
class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha_actividad = db.Column(db.Date, nullable=False)
    control_incidente = db.Column(db.String(50), nullable=True)
    control_cambio_cor = db.Column(db.String(50), nullable=True)
    control_cambio_dcce = db.Column(db.String(50), nullable=True)
    tecnico_nombre_apellido = db.Column(db.String(50), nullable=False)
    personal_infra_nombre_apellido = db.Column(db.String(50), nullable=False)
    actividad = db.Column(db.String(50), nullable=True)
    actividad_satisfactoria = db.Column(db.Boolean, nullable=True)
    tipo_de_mantenimiento= db.Column(db.String(50))
    observaciones= db.Column(db.String(50))
    create_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    
    def __repr__(self):
        return f'<Activity {self.fecha_actividad} >'

    def serialize(self):
        return {
            "id": self.id,
            "fecha_actividad": self.fecha_actividad.strftime('%Y-%m-%d'),
            "control_incidente": self.control_incidente,
            "control_cambio_cor": self.control_cambio_cor,
            "control_cambio_dcce": self.control_cambio_dcce,
            "tecnico_nombre_apellido": self.tecnico_nombre_apellido,
            "personal_infra_nombre_apellido": self.personal_infra_nombre_apellido,
            "actividad": self.actividad,
            "actividad_satisfactoria": self.actividad_satisfactoria,
            "tipo_de_mantenimiento": self.tipo_de_mantenimiento,
            "observaciones":self.observaciones,
            "created_at":self.create_at
        }
class Documents(db.Model):
    id =db.Column(db.Integer, primary_key=True)
    document_name = db.Column(db.String(255), nullable=False)
    document_type = db.Column(db.String(255), nullable=False)
    document_version = db.Column(db.String(255), nullable=False)
    document_unit=db.Column(db.String(255), nullable=False)
    document_file = db.Column(db.String(255), nullable=True)
    create_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def serialize(self):
        return {
            "id": self.id,
            "document_name": self.document_name,
            "document_type": self.document_type,
            "document_version": self.document_version,
            "document_unit": self.document_unit,
            "created_at":self.create_at
        }
        
class MaintenanceEvidence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'), nullable=False)
    evidence_file = db.Column(db.LargeBinary, nullable=False)
    create_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

    # Relación con la tabla Activity
    activity = db.relationship('Activity', backref=db.backref('maintenance_evidences', lazy=True))

    def __repr__(self):
        return f'<MaintenanceEvidence {self.create_at}>'

    def serialize(self):
        return {
            "id": self.id,
            "activity_id": self.activity_id,
            "create_at": self.create_at,
            # Puedes agregar más campos según sea necesario
        }
class Temperature(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    air_unit = db.Column(db.String(20), nullable=False)  # Nombre del aire (Aire 1, Aire 2, ..., Aire 7)
    temperature = db.Column(db.Float, nullable=False)  # Temperatura registrada
    measurement_time = db.Column(db.String(20), nullable=False)  # Hora de la medición
    measurement_date = db.Column(db.String(20), nullable=False)  # Fecha de la medición
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Temperature {self.air_unit} - {self.temperature}°C - {self.measurement_date} {self.measurement_time}>'

    def serialize(self):
        return {
            "id": self.id,
            "air_unit": self.air_unit,
            "temperature": self.temperature,
            "measurement_time": str(self.measurement_time),
            "measurement_date": str(self.measurement_date),
            "created_at": str(self.created_at)
        }