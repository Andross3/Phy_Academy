from flask import request, jsonify
from backend.app.models.inscripcion_model import Inscripcion
from backend.app.core.extensions import db
from backend.app.models.curso_model import Curso

def inscribir_estudiante_controller():
    data = request.get_json()
    id_estudiante = data.get("id_estudiante")
    id_curso = data.get("id_curso")
    if not id_estudiante or not id_curso:
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    # Verifica si ya está inscrito
    ya_inscrito = Inscripcion.query.filter_by(id_estudiante=id_estudiante, id_curso=id_curso).first()
    if ya_inscrito:
        return jsonify({"error": "Ya estás inscrito en este curso"}), 400

    inscripcion = Inscripcion(id_estudiante=id_estudiante, id_curso=id_curso)
    db.session.add(inscripcion)
    db.session.commit()
    return jsonify({"message": "Inscripción exitosa"}), 201

def cursos_inscritos_por_estudiante_controller(id_estudiante):
    # Busca todas las inscripciones del estudiante
    inscripciones = Inscripcion.query.filter_by(id_estudiante=id_estudiante).all()
    cursos = []
    for inscripcion in inscripciones:
        curso = Curso.query.get(inscripcion.id_curso)
        if curso:
            cursos.append({
                "id": curso.id,
                "nombre": curso.nombre,
                "descripcion": curso.descripcion
            })
    return jsonify({"cursos": cursos}), 200
