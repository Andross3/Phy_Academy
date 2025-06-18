from backend.app.core.extensions import db

class Estudiante(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    contraseña = db.Column(db.String(255), nullable=False)
    carrera = db.Column(db.String(100))
    universidad = db.Column(db.String(100))


    inscripciones = db.relationship("Inscripcion", back_populates="estudiante")
    resoluciones = db.relationship("Resolucion", back_populates="estudiante")
