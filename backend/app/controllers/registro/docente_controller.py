from flask import request, jsonify
from app.models.docente_model import Docente
from app.core.extensions import db
import re
import bcrypt

def registrar_docente():
    data = request.get_json()
    print("DEBUG payload recibido:", data)  # 👈 para depurar

    # Obtener y limpiar campos
    nombre = data.get("nombre", "").strip()
    apellido = data.get("apellido", "").strip()
    correo = data.get("correo", "").strip().lower()
    grado = data.get("grado_academico", "").strip()
    contrasena = data.get("contrasena", "").strip()  # ✅ cambiado

    # Validar campos obligatorios
    if not all([nombre, apellido, correo, grado, contrasena]):
        return jsonify({
            "error": "Los campos nombre, apellido, correo, grado académico y contraseña son obligatorios"
        }), 400

    # Validar formato del correo
    if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", correo):
        return jsonify({"error": "El correo electrónico no tiene un formato válido"}), 400


    # Verificar si el correo ya está registrado
    if Docente.query.filter_by(correo=correo).first():
        return jsonify({"error": "El correo ya está registrado"}), 400

    # Hashear la contraseña
    hashed_password = bcrypt.hashpw(contrasena.encode("utf-8"), bcrypt.gensalt())

    # Crear nuevo docente
    nuevo_docente = Docente(
        nombre=nombre,
        apellido=apellido,
        correo=correo,
        telefono=data.get("telefono"),
        pais=data.get("pais"),
        departamento=data.get("departamento"),
        provincia=data.get("provincia"),
        grado_academico=grado,
        institucion_educativa=data.get("institucion_educativa"),
        contraseña=hashed_password.decode("utf-8")
    )

    db.session.add(nuevo_docente)
    db.session.commit()

    return jsonify({"mensaje": "Docente registrado exitosamente"}), 201

