from flask import Flask
from .core.database import iniciar_base_datos
from .routes.auth_routes import auth_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    iniciar_base_datos(app)
    app.register_blueprint(auth_bp)
    return app
