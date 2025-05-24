from flask import Flask, request, jsonify, make_response
from compilador import Compilar_Codigo

app = Flask(__name__)

@app.after_request
def apply_cors(response):
    response.headers["Access-Control-Allow-Origin"]  = "http://localhost:5173"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@app.route('/compile', methods=['POST', 'OPTIONS'])
def route_compile():
    if request.method == 'OPTIONS':
        return make_response(('', 200))

    data = request.get_json() or {}
    codigo = data.get('codigo', '')
    if not codigo:
        return jsonify({'error': 'No se proporcionó código'}), 400

    compiler = Compilar_Codigo(codigo)
    compiler.convertir()
    errores = compiler.compilar()
    return jsonify({'errores': errores}), 200
