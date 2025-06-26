from flask import request, jsonify
from backend.app.models.curso_model import Curso
from backend.app.core.extensions import db
from backend.app.models.tema_model import Tema
from backend.app.models.tarea_models import Tarea
from datetime import datetime

def obtener_cursos_por_docente_controller(id_docente):
    cursos = Curso.query.filter_by(id_docente=id_docente).all()
    return jsonify([{
        "id": c.id,
        "nombre": c.nombre,
        "descripcion": c.descripcion
    } for c in cursos]), 200

def crear_curso_controller():
    data = request.get_json()
    nombre = data.get("nombre")
    descripcion = data.get("descripcion")
    id_docente = data.get("id_docente")
    if not nombre or not id_docente:
        return jsonify({"error": "Faltan datos obligatorios"}), 400
    curso = Curso(nombre=nombre, descripcion=descripcion, id_docente=id_docente)
    db.session.add(curso)
    db.session.commit()
    return jsonify({"message": "Curso creado", "curso": {
        "id": curso.id,
        "nombre": curso.nombre,
        "descripcion": curso.descripcion
    }}), 201

def obtener_temas_por_curso_controller(id_curso):
    temas = Tema.query.filter_by(id_curso=id_curso).all()
    temas_data = []
    for tema in temas:
        tareas = [
            {
                'id': tarea.id,
                'titulo': tarea.titulo,
                'descripcion': tarea.descripcion,
                'tipo_tarea': tarea.tipo_tarea,
                'fecha_entrega': tarea.fecha_entrega.isoformat() if tarea.fecha_entrega else None,
                'hora_entrega': tarea.hora_entrega.isoformat() if tarea.hora_entrega else None
            }
            for tarea in tema.tareas
        ]
        temas_data.append({
            'id': tema.id,
            'nombre': tema.notas,  # Usamos notas como nombre temporal
            'tareas': tareas
        })
    return jsonify({'temas': temas_data}), 200

def crear_tema_controller():
    data = request.get_json()
    id_curso = data.get('id_curso')
    nombre = data.get('nombre')  # Usaremos notas como nombre temporal
    if not id_curso or not nombre:
        return jsonify({'error': 'Faltan datos obligatorios'}), 400
    tema = Tema(id_curso=id_curso, notas=nombre)
    db.session.add(tema)
    db.session.commit()
    return jsonify({'message': 'Tema creado', 'tema': {'id': tema.id, 'nombre': tema.notas}}), 201

def crear_tarea_en_tema_controller():
    data = request.get_json()
    id_tema = data.get('id_tema')
    titulo = data.get('titulo')
    descripcion = data.get('descripcion')
    tipo_tarea = data.get('tipo_tarea')
    fecha_entrega = data.get('fecha_entrega')
    hora_entrega = data.get('hora_entrega')
    if not id_tema or not titulo or not descripcion or not tipo_tarea or not fecha_entrega or not hora_entrega:
        return jsonify({'error': 'Faltan datos obligatorios'}), 400
    tarea = Tarea(
        id_tema=id_tema,
        titulo=titulo,
        descripcion=descripcion,
        tipo_tarea=tipo_tarea,
        fecha_entrega=datetime.strptime(fecha_entrega, '%Y-%m-%d').date(),
        hora_entrega=datetime.strptime(hora_entrega, '%H:%M').time()
    )
    db.session.add(tarea)
    db.session.commit()
    return jsonify({'message': 'Tarea creada', 'tarea': {'id': tarea.id, 'titulo': tarea.titulo}}), 201

def obtener_todos_los_cursos_controller():
    cursos = Curso.query.all()
    return jsonify([{
        "id": c.id,
        "nombre": c.nombre,
        "descripcion": c.descripcion
    } for c in cursos]), 200

def update_curso_controller(id):
    data = request.get_json()
    curso = Curso.query.get(id)
    if not curso:
        return jsonify({"error": "Curso no encontrado"}), 404
    nombre = data.get("nombre")
    descripcion = data.get("descripcion")
    if nombre is not None:
        curso.nombre = nombre
    if descripcion is not None:
        curso.descripcion = descripcion
    db.session.commit()
    return jsonify({"message": "Curso actualizado"}), 200

def delete_curso_controller(id):
    curso = Curso.query.get(id)
    if not curso:
        return jsonify({"error": "Curso no encontrado"}), 404
    db.session.delete(curso)
    db.session.commit()
    return jsonify({"message": "Curso eliminado"}), 200
