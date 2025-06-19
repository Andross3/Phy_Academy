from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.app.core.database import iniciar_base_datos
from backend.app.core.extensions import db
from backend.app.routes.auth_routes import auth_bp
from sqlalchemy import text
from backend.app.routes.ejecutador_routes import ejecutador_bp
from backend.app.routes.tarea_routes import tarea_bp  # Importa tarea_bp
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)  # Para permitir llamadas desde el frontend
iniciar_base_datos(app)
#registrar los Blueprints de las rutas
app.register_blueprint(auth_bp)
app.register_blueprint(ejecutador_bp)
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app)
    iniciar_base_datos(app)   # esto ya hace db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(ejecutador_bp)
    app.register_blueprint(tarea_bp)

    return app

# Solo para desarrollo local (opcional)
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
