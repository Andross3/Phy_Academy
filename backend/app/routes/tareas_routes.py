from flask import Blueprint, request
from backend.app.controllers.tarea_controller import (
    guardar_tarea_controller,
    obtener_tarea_por_id_controller,
    obtener_tareas_controller  # <-- ¡Asegúrate de importar esta!
)

tarea_bp = Blueprint("tareas", __name__, url_prefix='/api')

@tarea_bp.route('/tareas', methods=['POST'])
def guardar_tarea():
    return guardar_tarea_controller(request)

@tarea_bp.route('/tareas/<int:id>', methods=['GET']) 
def obtener_tarea_por_id(id):
    return obtener_tarea_por_id_controller(id)

@tarea_bp.route('/tareas', methods=['GET'])
def obtener_tareas():
    return obtener_tareas_controller()