from ..core.extensions import db

class Estudiante(db.Model):
    __tablename__ = 'estudiante'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    telefono = db.Column(db.String(20))
    grado_academico = db.Column(db.String(50))

    inscripciones = db.relationship("Inscripcion", back_populates="estudiante")
    resoluciones = db.relationship("Resolucion", back_populates="estudiante")
