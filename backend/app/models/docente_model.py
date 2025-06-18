from ..core.extensions import db

class Docente(db.Model):
    __tablename__ = 'docente'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    telefono = db.Column(db.String(20))
    pais = db.Column(db.String(50))
    departamento = db.Column(db.String(50))
    provincia = db.Column(db.String(50))
    grado_academico = db.Column(db.String(50))
    institucion_educativa = db.Column(db.String(100))
    contraseña = db.Column(db.String(255), nullable=False) 

    cursos = db.relationship("Curso", back_populates="docente")