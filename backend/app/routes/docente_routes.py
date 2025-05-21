# app/routes/docente_routes.py

from flask import Blueprint
from app.controllers.docente_controller import registrar_docente

docente_bp = Blueprint('docente', __name__, url_prefix='/docentes')

# Ruta para registrar un docente
docente_bp.route('/registrar', methods=['POST'])(registrar_docente)
