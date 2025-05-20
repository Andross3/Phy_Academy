from ..core.extensions import db

class Ejercicio(db.Model):
    __tablename__ = 'ejercicio'

    id = db.Column(db.Integer, primary_key=True)
    id_tema = db.Column(db.Integer, db.ForeignKey("tema.id"), nullable=False)
    descripcion = db.Column(db.Text)
    fecha_publicacion = db.Column(db.Date)
    resultados_esperados = db.Column(db.Text)

    tema = db.relationship("Tema", back_populates="ejercicios")
    resoluciones = db.relationship("Resolucion", back_populates="ejercicio")