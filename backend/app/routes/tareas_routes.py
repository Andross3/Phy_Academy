from flask import Blueprint, request
from backend.app.controllers.tarea_controller import guardar_tarea_controller

tarea_bp = Blueprint("tareas", __name__, url_prefix='/api')

@tarea_bp.route('/tareas', methods=['POST'])
def guardar_tarea():
    return guardar_tarea_controller(request)