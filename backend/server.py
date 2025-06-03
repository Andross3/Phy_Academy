from flask import Flask, request, jsonify, make_response
from compilador import Compilar_Codigo

app = Flask(__name__)

@app.after_request
def apply_cors(response):
    response.headers["Access-Control-Allow-Origin"]  = "http://localhost:5173"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@app.route('/compile', methods=['POST'])
def compile_code():
    data = request.get_json()
    codigo = data.get('codigo', '')
    restricciones = data.get('restricciones', [])
    
    # Verificar restricciones primero
    errores_restriccion = []
    for palabra in restricciones:
        if re.search(rf'\b{palabra}\b', codigo, re.IGNORECASE):
            lineas = codigo.split('\n')
            linea = next((i+1 for i, linea in enumerate(lineas) 
                        if re.search(rf'\b{palabra}\b', linea, re.IGNORECASE)), 0)
            errores_restriccion.append({
                'palabra': palabra,
                'linea': linea,
                'mensaje': f'No está permitido usar "{palabra}" en este ejercicio'
            })
    
    if errores_restriccion:
        return jsonify({
            'error': 'Restricciones violadas',
            'errores': '\n'.join([f"Línea {e['linea']}: {e['mensaje']}" 
                                for e in errores_restriccion])
        }), 400
    
    # Si pasa las restricciones, compilar normalmente
    compilador = Compilar_Codigo(codigo)
    try:
        compilador.convertir()
        compilador.compilar()
        return jsonify({'errores': ''})
    except Exception as e:
        return jsonify({'errores': str(e)})