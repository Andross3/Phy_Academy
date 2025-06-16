from flask import request, jsonify


def ejecutar_codigo(request):
    datos = request.get_json()
    return jsonify({'mensaje': 'codigo recibido'}), 200