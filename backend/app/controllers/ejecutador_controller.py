from flask import request, jsonify
from backend.sandbox.sandbox_interface import Sandbox

def ejecutar_codigo(request):
    datos = request.get_json()
    codigo = datos.get('code')

    sandbox_prueba = Sandbox(1, codigo)
    sandbox_prueba.correr_codigo()
    sandbox_prueba.crear_pool()
    output_codigo = sandbox_prueba.respuesta()
    
    return jsonify({'mensaje': output_codigo}), 200