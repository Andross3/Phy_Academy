from flask import Flask, request, jsonify
from flask_cors import CORS
from app.core.database import iniciar_base_datos
from app.core.extensions import db
from app.routes.auth_routes import auth_bp
from sqlalchemy import text
from app.routes.docente_routes import docente_bp  # Importa tu blueprint


app = Flask(__name__)
CORS(app) 
iniciar_base_datos(app)
#registrar los Blueprints de las rutas
app.register_blueprint(auth_bp)
app.register_blueprint(docente_bp)


@app.route("/ver")
def ver():
    try:
        db.session.execute(text("SELECT 1"))
        return {"message": "Conexion exitosa a la base de datos"}, 200
    except Exception as e:
        return {"error": str(e)}, 500


if __name__ == "__main__":
    app.run(debug=True)
