import re
from flask import request, jsonify
from backend.sandbox.sandbox_interface import Sandbox
from googletrans import Translator

traductor = Translator()

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
    #traduccion del ingles a español
    tipo_es = traductor.translate(text=separar_palabras(tipo), src='en', dest='es')
    descripcion_es = traductor.translate(text=descripcion, src='en', dest='es')

    mensajeBonito = (
        f"Error:\n"
        f"Tipo: {tipo_es.text}\n"
        f"Línea: {linea}\n"
        f"Descripción: {descripcion_es.text}"
    )

    return mensajeBonito

def separar_palabras(cadena):
    pos = []
    cont = 0
    for i in cadena:
        if i.isupper():
            pos.append(cont)
        cont=cont+1

    palabras = []
    for i in range(len(pos)):
        inicio = pos[i]
        fin = pos[i+1] if i+1 < len(pos) else len(cadena)
        palabras.append(cadena[inicio:fin])
    return ' '.join(palabras)