import ast
from flask import request, jsonify
from backend.sandbox.sandbox_interface import Sandbox

def extraer_variables(request):
    datos = request.get_json()
    codigo = datos.get('codigo')
    variables = extraer_variables_enteras(codigo)
    return jsonify({'variables': variables}), 200

def extraer_variables_enteras(codigo):
    variables = []
    try:
        tree = ast.parse(codigo)
        for nodo in ast.walk(tree):
            if isinstance(nodo, ast.Assign):
                for target in nodo.targets:
                    if isinstance(target, ast.Name):
                        nombre_var = target.id

                        if isinstance(nodo.value, ast.Constant):
                            valor = nodo.value.value
                        elif isinstance(nodo.value, ast.Call):
                            valor = f"Función: {ast.unparse(nodo.value)}"
                        elif isinstance(nodo.value, ast.BinOp):
                            valor = f"Operación: {ast.unparse(nodo.value)}"
                        else:
                            valor = "No evaluable directamente"

                        variables.append({
                            "name": nombre_var,
                            "value": valor
                        })
    except Exception as e:
        print(f"Error al analizar el código: {e}")
    return variables
