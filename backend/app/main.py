from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.app.core.database import iniciar_base_datos
from backend.app.core.extensions import db
from backend.app.routes.auth_routes import auth_bp
from sqlalchemy import text

app = Flask(__name__)
CORS(app)  # Para permitir llamadas desde el frontend
iniciar_base_datos(app)
#registrar los Blueprints de las rutas
app.register_blueprint(auth_bp)
@app.route("/ver")
def ver():
    try:
        db.session.execute(text("SELECT 1"))
        return {"message": "Conexion exitosa a la base de datos"}, 200
    except Exception as e:
        return {"error": str(e)}, 500
if __name__ == "__main__":
    app.run(debug=True)
