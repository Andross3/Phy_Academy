from flask import Blueprint
from backend.app.controllers.registro.docente_controller import registrar_docente
from backend.app.controllers.curso_controller import (
    obtener_cursos_por_docente_controller, crear_curso_controller,
    obtener_temas_por_curso_controller, crear_tema_controller, crear_tarea_en_tema_controller,
    obtener_todos_los_cursos_controller, update_curso_controller, delete_curso_controller
)

docente_bp = Blueprint('docente', __name__, url_prefix='/api')

@docente_bp.route('/docente/registrar', methods=['POST'])
def registro():
    return registrar_docente()

@docente_bp.route('/docente/<int:id_docente>/cursos', methods=['GET'])
def obtener_cursos(id_docente):
    return obtener_cursos_por_docente_controller(id_docente)

@docente_bp.route('/curso', methods=['POST'])
def crear_curso():
    return crear_curso_controller()

@docente_bp.route('/curso/<int:id_curso>/temas', methods=['GET'])
def obtener_temas_por_curso(id_curso):
    return obtener_temas_por_curso_controller(id_curso)

@docente_bp.route('/tema', methods=['POST'])
def crear_tema():
    return crear_tema_controller()

@docente_bp.route('/tarea', methods=['POST'])
def crear_tarea_en_tema():
    return crear_tarea_en_tema_controller()

@docente_bp.route('/cursos', methods=['GET'])
def obtener_todos_los_cursos():
    return obtener_todos_los_cursos_controller()

@docente_bp.route('/curso/<int:id>', methods=['PATCH', 'PUT'])
def update_curso(id):
    return update_curso_controller(id)

@docente_bp.route('/curso/<int:id>', methods=['DELETE'])
def delete_curso(id):
    return delete_curso_controller(id)

