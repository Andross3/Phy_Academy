import re
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
    mensaje = output_codigo.get('stdout','')
    mensajeError = output_codigo.get('stderr','')
    if mensaje != "":
     return jsonify({'mensaje': mensaje}), 200
    else:
     mensajeBonito = formatoErrores(mensajeError)
     return jsonify({'mensaje': mensajeBonito}), 200

def formatoErrores(texto_error_capturado):
    lineas_error = re.findall(r'File ".*", line (\d+)', texto_error_capturado)
    tipo_error = re.search(r'(\w+Error|Exception): (.+)', texto_error_capturado)

    linea = lineas_error[-1] if lineas_error else "desconocida"
    tipo = tipo_error.group(1) if tipo_error else "Error desconocido"
    descripcion = tipo_error.group(2) if tipo_error else texto_error_capturado.strip()

    mensajeBonito = (
        f"Error:\n"
        f"Tipo: {tipo}\n"
        f"Línea: {linea}\n"
        f"Descripción: {descripcion}"
    )

    return mensajeBonito
     
