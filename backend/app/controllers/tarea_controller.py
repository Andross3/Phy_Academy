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

def obtener_tarea_por_id_controller(id):
    try:
        tarea = Tarea.query.get(id)
        if not tarea:
            return jsonify({'error': 'Tarea no encontrada'}), 404

        return jsonify({
            'id': tarea.id,
            'titulo': tarea.titulo,
            'descripcion': tarea.descripcion,
            'tipo_tarea': tarea.tipo_tarea,
            'restricciones': tarea.restricciones,
            'codigo_plantilla': tarea.codigo_plantilla,
            'fecha_entrega': tarea.fecha_entrega.isoformat() if tarea.fecha_entrega else None,
            'hora_entrega': tarea.hora_entrega.isoformat() if tarea.hora_entrega else None
        }), 200
    except Exception as e:
        return jsonify({'error': f'Error al obtener la tarea: {str(e)}'}), 500

def obtener_tareas_controller():
    try:
        tareas = Tarea.query.all()
        lista_tareas = []
        for tarea in tareas:
            lista_tareas.append({
                'id': tarea.id,
                'titulo': tarea.titulo,
                'descripcion': tarea.descripcion,
                'tipo_tarea': tarea.tipo_tarea,
                'restricciones': tarea.restricciones,
                'codigo_plantilla': tarea.codigo_plantilla,
                'fecha_entrega': tarea.fecha_entrega.isoformat() if tarea.fecha_entrega else None,
                'hora_entrega': tarea.hora_entrega.isoformat() if tarea.hora_entrega else None
            })
        return jsonify({'tareas': lista_tareas}), 200
    except Exception as e:
        print(f"Error al obtener tareas: {str(e)}")
        return jsonify({'error': f'Error al obtener tareas: {str(e)}'}), 500

def update_tarea_controller(id):
    try:
        data = request.get_json()
        print("Datos recibidos para update:", data)  # <--- AGREGA ESTO
        tarea = Tarea.query.get(id)
        if not tarea:
            return jsonify({'error': 'Tarea no encontrada'}), 404
        # Actualizar solo los campos enviados
        for campo in ['titulo', 'descripcion', 'tipo_tarea', 'restricciones', 'codigo_plantilla', 'fecha_entrega', 'hora_entrega']:
            if campo in data:
                print(f"Actualizando campo {campo} con valor {data[campo]}")  # <--- AGREGA ESTO
                if campo in ['fecha_entrega'] and data[campo]:
                    tarea.fecha_entrega = datetime.strptime(data[campo], '%Y-%m-%d').date()
                elif campo in ['hora_entrega'] and data[campo]:
                    try:
                        # Intenta con segundos
                        tarea.hora_entrega = datetime.strptime(data[campo], '%H:%M:%S').time()
                    except ValueError:
                        # Si falla, intenta sin segundos
                        tarea.hora_entrega = datetime.strptime(data[campo], '%H:%M').time()
                else:
                    setattr(tarea, campo, data[campo])
        db.session.commit()
        return jsonify({'message': 'Tarea actualizada exitosamente'}), 200
    except Exception as e:
        db.session.rollback()
        print("Error en update_tarea_controller:", str(e))  # <--- AGREGA ESTO
        return jsonify({'error': f'Error al actualizar la tarea: {str(e)}'}), 500

def delete_tarea_controller(id):
    try:
        tarea = Tarea.query.get(id)
        if not tarea:
            return jsonify({'error': 'Tarea no encontrada'}), 404
        db.session.delete(tarea)
        db.session.commit()
        return jsonify({'message': 'Tarea eliminada exitosamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error al eliminar la tarea: {str(e)}'}), 500