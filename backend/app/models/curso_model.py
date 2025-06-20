from ..core.extensions import db

class Curso(db.Model):
    __tablename__ = 'curso'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(255))
    id_docente = db.Column(db.Integer, db.ForeignKey("docente.id"), nullable=False)

    docente = db.relationship("Docente", back_populates="cursos")
    temas = db.relationship("Tema", back_populates="curso")
    inscripciones = db.relationship("Inscripcion", back_populates="curso")