from ..core.extensions import db

class Tema(db.Model):
    __tablename__ = 'tema'

    id = db.Column(db.Integer, primary_key=True)
    id_curso = db.Column(db.Integer, db.ForeignKey("curso.id"), nullable=False)
    enlaces_videos = db.Column(db.Text)
    texto_pdf = db.Column(db.Text)
    notas = db.Column(db.Text)

    curso = db.relationship("Curso", back_populates="temas")
    tareas = db.relationship("Tarea", back_populates="tema")