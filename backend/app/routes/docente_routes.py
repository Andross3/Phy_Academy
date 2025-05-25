from flask import Blueprint
from app.controllers.registro.docente_controller import registrar_docente

docente_bp = Blueprint('docente', __name__, url_prefix='/docentes')

@docente_bp.route('/registrar', methods=['POST'])
def registrar():
    return registrar_docente()

