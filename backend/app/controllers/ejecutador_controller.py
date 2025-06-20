import re
from flask import request, jsonify
from backend.sandbox.sandbox_interface import Sandbox
from backend.app.models import Tarea

def remover_cadenas(codigo):
    return re.sub(r"(\".*?\"|'.*?')", "", codigo)

def contiene_palabras_prohibidas(codigo, restricciones):
    codigo_sin_cadenas = remover_cadenas(codigo)
    for palabra in restricciones:
        if palabra in codigo_sin_cadenas:
            return palabra
    return None

def ejecutar_codigo(request):
    datos = request.get_json()
    codigo = datos.get('codigo')
    tarea_id = datos.get('tarea_id')  

    tarea = Tarea.query.filter_by(id=tarea_id).first()
    if not tarea:
        return jsonify({'mensaje': 'Tarea no encontrada', 'autorizado': False})

    restricciones = tarea.restricciones

    palabra_detectada = contiene_palabras_prohibidas(codigo, restricciones)
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
