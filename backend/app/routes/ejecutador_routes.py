from flask import Blueprint, request, jsonify
from ..controllers.ejecutador_controller import ejecutar_codigo
# from ..controllers.ejecutador_controller import probar
ejecutador_bp = Blueprint("ejecutador", __name__)

@ejecutador_bp.route("/ejecutar", methods=['POST'])
def ejecutarCodigo():
    return ejecutar_codigo(request)

# def probar1():
#     return probar(request)