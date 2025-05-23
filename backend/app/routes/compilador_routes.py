# backend/app/routes/compilador_routes.py
from flask import Blueprint, request, jsonify
import subprocess
import sys
import os

compilador_bp = Blueprint('compilador', __name__)

@compilador_bp.route('/compilar', methods=['POST'])
def compilar():
    data = request.get_json()
    codigo = data.get("codigo", "")

    try:
        # Ejecutar automatizar.py y enviar código por stdin
        proceso = subprocess.run(
            [sys.executable, "backend/app/sandbox/automatizar.py"],
            input=codigo,
            capture_output=True,
            text=True
        )

        return jsonify({
            "salida": proceso.stdout.strip(),
            "error": proceso.stderr.strip()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
