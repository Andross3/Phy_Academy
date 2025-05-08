from flask import Flask
from .config import Config
from .extensions import db
from flask_cors import CORS
# blueprint
from .modules.estudiante.routes import estudiantes_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    #iniciar la base de datos con flask
    db.init_app(app)
    CORS(app)
    # Registrar blueprints
    app.register_blueprint(estudiantes_bp, url_prefix='/api/estudiantes')

    return app
