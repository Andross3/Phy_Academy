from flask import jsonify
import bcrypt
from backend.app.models.estudiante_model import Estudiante
from backend.app.models.docente_model import Docente

def login(request):
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Correo y contraseña son requeridos"}), 400

    user = None
    role = None

    if email.endswith("@est.com"):
        user = Estudiante.query.filter_by(correo=email).first()
        role = "estudiante"
    elif email.endswith("@doc.com"):
        user = Docente.query.filter_by(correo=email).first()
        role = "docente"
    else:
        return jsonify({"error": "Dominio no permitido"}), 403

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if not bcrypt.checkpw(password.encode("utf-8"), user.contraseña.encode("utf-8")):
        return jsonify({"error": "Contraseña incorrecta"}), 401

    return jsonify({
        "message": "Inicio de sesión exitoso",
        "role": role,
        "id": user.id,
        "nombre": user.nombre,
        "apellido": user.apellido,
        "correo": user.correo
    }), 200
