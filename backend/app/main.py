from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.app.core.database import iniciar_base_datos
from backend.app.core.extensions import db
from backend.app.routes.auth_routes import auth_bp
from backend.app.routes.ejecutador_routes import ejecutador_bp
from backend.app.routes.tareas_routes import tarea_bp
from flask_migrate import Migrate
from .models import *

app = Flask(__name__)
CORS(app)  # Para permitir llamadas desde el frontend
iniciar_base_datos(app)
migrate = Migrate(app, db)
#registrar los Blueprints de las rutas
app.register_blueprint(auth_bp)
app.register_blueprint(ejecutador_bp)
app.register_blueprint(tarea_bp)

if __name__ == "__main__":
    app.run(debug=True)
