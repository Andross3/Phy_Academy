from flask import request, jsonify
from backend.app.models.tarea_models import Tarea
from backend.app.core.extensions import db
from datetime import datetime

def guardar_tarea_controller(request):
    try:
        data = request.get_json()
        print("Datos recibidos:", data)  # Para debugging
        
        # Validar datos requeridos
        if not data.get('titulo'):
            return jsonify({'error': 'El título es requerido'}), 400
        if not data.get('descripcion'):
            return jsonify({'error': 'La descripción es requerida'}), 400
        if not data.get('tipo_tarea'):
            return jsonify({'error': 'El tipo de tarea es requerido'}), 400
        if not data.get('fecha_entrega'):
            return jsonify({'error': 'La fecha de entrega es requerida'}), 400
        if not data.get('hora_entrega'):
            return jsonify({'error': 'La hora de entrega es requerida'}), 400

        try:
            # Convertir fecha y hora a objetos datetime
            fecha_entrega = datetime.strptime(data['fecha_entrega'], '%Y-%m-%d').date()
            hora_entrega = datetime.strptime(data['hora_entrega'], '%H:%M').time()
        except ValueError as e:
            return jsonify({'error': f'Formato de fecha/hora inválido: {str(e)}'}), 400

        # Crear nueva tarea
        nueva_tarea = Tarea(
            titulo=data['titulo'],
            descripcion=data['descripcion'],
            tipo_tarea=data['tipo_tarea'],
            restricciones=data.get('restricciones', []),
            codigo_plantilla=data.get('codigo_plantilla', ''),
            fecha_entrega=fecha_entrega,
            hora_entrega=hora_entrega
        )

        db.session.add(nueva_tarea)
        db.session.commit()

        return jsonify({
            'message': 'Tarea creada exitosamente',
            'tarea': {
                'id': nueva_tarea.id,
                'titulo': nueva_tarea.titulo,
                'descripcion': nueva_tarea.descripcion,
                'tipo_tarea': nueva_tarea.tipo_tarea,
                'fecha_entrega': nueva_tarea.fecha_entrega.isoformat(),
                'hora_entrega': nueva_tarea.hora_entrega.isoformat()
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error al guardar tarea: {str(e)}")
        return jsonify({'error': f'Error al guardar la tarea: {str(e)}'}), 500
