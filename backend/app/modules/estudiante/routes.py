from flask import Blueprint

estudiantes_bp = Blueprint('modulo', __name__)

@estudiantes_bp.route('/data')
def hola():
    return 'hola'