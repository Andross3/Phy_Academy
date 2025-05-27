from flask import Blueprint
from app.controllers.registro.estudiante_controller import registrar_estudiante

estudiante_bp = Blueprint("estudiante_bp", __name__, url_prefix="/estudiantes")

@estudiante_bp.route("/registrar", methods=["POST"])
def registrar():
    return registrar_estudiante()

