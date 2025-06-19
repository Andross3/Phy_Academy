from flask import Flask
from flask_cors import CORS
from backend.app.core.extensions import db

def create_app():
    app = Flask(__name__)
    
    # Configure CORS - more permissive for development
    CORS(app, 
         resources={r"/api/*": {
             "origins": ["http://localhost:5173"],
             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
             "allow_headers": ["Content-Type", "Authorization"],
             "expose_headers": ["Content-Type", "Authorization"],
             "supports_credentials": True,
             "allow_credentials": True
         }},
         supports_credentials=True
    )
    
    # Configure database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://your_username:your_password@localhost/your_database'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)
    
    # Register blueprints
    from backend.app.routes import tareas_bp
    app.register_blueprint(tareas_bp, url_prefix='/api')
    
    return app 