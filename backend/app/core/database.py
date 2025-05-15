from flask import Flask
from .config import Config
from .extensions import db, migrate

def iniciar_base_datos(app: Flask):
    from .. import models
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
