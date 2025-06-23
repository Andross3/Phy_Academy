from backend.app.core.extensions import db
from datetime import datetime
from sqlalchemy import func

class Tarea(db.Model):
    __tablename__ = 'tarea'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=True)
    descripcion = db.Column(db.Text, nullable=False)
    tipo_tarea = db.Column(db.String(50), nullable=False)  # 'normal', 'restricciones', 'plantilla'
    restricciones = db.Column(db.ARRAY(db.String), nullable=True)  # solo para tipo 'restricciones'
    codigo_plantilla = db.Column(db.Text, nullable=True)  # solo para tipo 'plantilla'
    fecha_publicacion = db.Column(db.DateTime, default=func.now(), nullable=False)
    fecha_entrega = db.Column(db.Date, nullable=True)
    hora_entrega = db.Column(db.Time, nullable=True)

    # NUEVO: Relación con Tema
    id_tema = db.Column(db.Integer, db.ForeignKey("tema.id"), nullable=False)
    tema = db.relationship("Tema", back_populates="tareas")

    # NUEVO: Relación con Resolucion
    resoluciones = db.relationship("Resolucion", back_populates="tarea")
