from flask import request, jsonify
from backend.app.models import Tarea
from backend.app.core.database import db
from datetime import datetime

def guardar_tarea_controller(request):
    datos_json = request.get_json()
    descripcion = datos_json.get('descripcion')
    tipo_tarea = datos_json.get('tipoTarea')
    restricciones = datos_json.get('restricciones', [])
    print(descripcion, tipo_tarea, restricciones)

    nueva_tarea = Tarea(
        descripcion = descripcion,
        restricciones = restricciones,
        fecha_publicacion = datetime.now(),
        tipo_tarea = tipo_tarea
    )

    db.session.add(nueva_tarea)
    db.session.commit()

    return jsonify({
            'message': 'Tarea guardada exitosamente',
            'tarea_id': nueva_tarea.id
        }), 201
