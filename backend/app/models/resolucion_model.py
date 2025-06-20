from ..core.extensions import db

class Resolucion(db.Model):
    __tablename__ = 'resolucion'

    id = db.Column(db.Integer, primary_key=True)
    id_ejercicio = db.Column(db.Integer, db.ForeignKey("ejercicio.id"), nullable=False)
    id_estudiante = db.Column(db.Integer, db.ForeignKey("estudiante.id"), nullable=False)
    codigo = db.Column(db.Text)
    resultado = db.Column(db.Text)
    fecha_envio = db.Column(db.Date)

    ejercicio = db.relationship("Ejercicio", back_populates="resoluciones")
    estudiante = db.relationship("Estudiante", back_populates="resoluciones")
