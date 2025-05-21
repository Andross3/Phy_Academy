# app/controllers/docente_controller.py

from flask import request, jsonify
from app.models.docente_model import Docente
from app.core.extensions import db

def registrar_docente():
    data = request.get_json()

    if not all([data.get('nombre'), data.get('apellido'), data.get('correo'), data.get('grado_academico')]):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    if Docente.query.filter_by(correo=data['correo']).first():
        return jsonify({"error": "El correo ya está registrado"}), 400

    nuevo_docente = Docente(
        nombre=data['nombre'],
        apellido=data['apellido'],
        correo=data['correo'],
        telefono=data.get('telefono'),
        pais=data.get('pais'),
        departamento=data.get('departamento'),
        provincia=data.get('provincia'),
        grado_academico=data['grado_academico'],
        institucion_educativa=data.get('institucion_educativa')
    )

    db.session.add(nuevo_docente)
    db.session.commit()

    return jsonify({"mensaje": "Docente registrado exitosamente"}), 201
