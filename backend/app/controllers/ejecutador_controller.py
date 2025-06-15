from flask import request, jsonify
from backend.sandbox.sandbox_interface import Sandbox

def ejecutar_codigo(request):
    datos = request.get_json()
    codigo = datos.get('codigo')
    sandbox_prueba = Sandbox(1, codigo)
    sandbox_prueba.correr_codigo()
    sandbox_prueba.crear_pool()
    output_codigo = sandbox_prueba.respuesta()
    mensaje = output_codigo.get('stdout')
    return jsonify({'mensaje': mensaje}), 200