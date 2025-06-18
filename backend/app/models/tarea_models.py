from backend.app.core.extensions import db
from datetime import datetime
from sqlalchemy import func

class Tarea(db.Model):
    __tablename__ = 'tarea'

    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.Text, nullable=False)
    restricciones = db.Column(db.ARRAY(db.String), nullable=False)
    fecha_publicacion = db.Column(db.DateTime, default=func.now(), nullable=False)
    tipo_tarea = db.Column(db.String(50), nullable=False)