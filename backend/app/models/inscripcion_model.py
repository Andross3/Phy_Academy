from ..core.extensions import db

class Inscripcion(db.Model):
    __tablename__ = 'inscripcion'

    id = db.Column(db.Integer, primary_key=True)
    id_estudiante = db.Column(db.Integer, db.ForeignKey("estudiante.id"), nullable=False)
    id_curso = db.Column(db.Integer, db.ForeignKey("curso.id"), nullable=False)

    estudiante = db.relationship("Estudiante", back_populates="inscripciones")
    curso = db.relationship("Curso", back_populates="inscripciones")
