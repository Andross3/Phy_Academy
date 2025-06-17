from flask import request, jsonify
from backend.sandbox.sandbox_interface import Sandbox

PALABRAS_PROHIBIDAS = [
    'for'  
]

def contiene_palabras_prohibidas(codigo):
    for palabra in PALABRAS_PROHIBIDAS:
        if palabra in codigo:
            return palabra
    return None

def ejecutar_codigo(request):
    datos = request.get_json()
    codigo = datos.get('codigo')

    palabra_detectada = contiene_palabras_prohibidas(codigo)
    if palabra_detectada:
        return jsonify({
            'mensaje': f"El código contiene una palabra reservada no permitida: '{palabra_detectada}'",
            'autorizado': False
        })

    sandbox_prueba = Sandbox(1, codigo)
    sandbox_prueba.correr_codigo()
    sandbox_prueba.crear_pool()
    output_codigo = sandbox_prueba.respuesta()
    mensaje = output_codigo.get('stdout')

    return jsonify({
        'mensaje': mensaje,
        'autorizado': True
    })
