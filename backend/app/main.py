import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from backend.app.core.database import iniciar_base_datos
from backend.app.core.extensions import db
from backend.app.routes.auth_routes import auth_bp
from backend.app.routes.ejecutador_routes import ejecutador_bp
from backend.app.routes.tareas_routes import tarea_bp
from flask_migrate import Migrate
from .models import *

from sqlalchemy import text
from backend.app.routes.docente_routes import docente_bp
from backend.app.routes.estudiante_routes import estudiante_bp

app = Flask(
    __name__,
    static_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '../../frontend/dist')),  # ruta relativa desde este archivo
    static_url_path="/"
)
CORS(app)  # Para permitir llamadas desde el frontend
iniciar_base_datos(app)
migrate = Migrate(app, db)
#registrar los Blueprints de las rutas
app.register_blueprint(auth_bp)
app.register_blueprint(ejecutador_bp)
app.register_blueprint(tarea_bp)
app.register_blueprint(estudiante_bp)
app.register_blueprint(docente_bp)

@app.route("/health")
def health_check():
    try:
        db.session.execute(text("SELECT 1"))
        return {"message": "Conexión exitosa a la base de datos"}, 200
    except Exception as e:
        return {"error": str(e)}, 500
    
# Rutas para servir frontend desde dist/
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # usa PORT que da Railway, si no usa 5000
    with app.app_context():
        from flask_migrate import upgrade
        upgrade()
    app.run(host="0.0.0.0", port=port)