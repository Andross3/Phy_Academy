from flask import Blueprint, request, jsonify
from ..controllers.ejecutador_controller import ejecutar_codigo
from ..controllers.extraer_controller import extraer_variables
# from ..controllers.ejecutador_controller import probar
ejecutador_bp = Blueprint("ejecutador", __name__)

@ejecutador_bp.route("/ejecutar", methods=['POST'])
def ejecutarCodigo():
    return ejecutar_codigo(request)

@ejecutador_bp.route("/extraer-variables", methods=['POST'])
def extraerVariables():
    return extraer_variables(request)
# def probar1():
#     return probar(request)