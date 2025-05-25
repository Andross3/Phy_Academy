from flask import request, jsonify
from app.models.estudiante_model import Estudiante
from app.core.extensions import db
import bcrypt

def registrar_estudiante():
    data = request.get_json()

    # Validación básica
    campos_obligatorios = ["nombre", "apellido", "correo", "carrera", "universidad", "contraseña"]
    if not all(data.get(campo) for campo in campos_obligatorios):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    # Verificar si ya existe ese correo
    if Estudiante.query.filter_by(correo=data["correo"]).first():
        return jsonify({"error": "El correo ya está registrado"}), 400

    # Hashear la contraseña
    hashed = bcrypt.hashpw(data["contraseña"].encode("utf-8"), bcrypt.gensalt())

    nuevo_estudiante = Estudiante(
        nombre=data["nombre"],
        apellido=data["apellido"],
        correo=data["correo"],
        contraseña=hashed.decode("utf-8"),
        carrera=data["carrera"],
        universidad=data["universidad"]
    )

    db.session.add(nuevo_estudiante)
    db.session.commit()

    return jsonify({"mensaje": "Estudiante registrado correctamente"}), 201
