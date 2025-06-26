from flask import Blueprint
from backend.app.controllers.inscripcion_controller import inscribir_estudiante_controller, cursos_inscritos_por_estudiante_controller

inscripcion_bp = Blueprint("inscripcion_bp", __name__, url_prefix="/inscripciones")

@inscripcion_bp.route("/inscribir", methods=["POST"])
def inscribir():
    return inscribir_estudiante_controller()

@inscripcion_bp.route("/estudiante/<int:id_estudiante>/cursos", methods=["GET"])
def cursos_inscritos_estudiante(id_estudiante):
    return cursos_inscritos_por_estudiante_controller(id_estudiante)
