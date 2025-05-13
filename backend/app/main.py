from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Para permitir llamadas desde el frontend

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email es requerido"}), 400

    if email.endswith("@est.com"):
        return jsonify({"role": "estudiante"}), 200
    elif email.endswith("@doc.com"):
        return jsonify({"role": "docente"}), 200
    else:
        return jsonify({"error": "Dominio no permitido"}), 403

if __name__ == "__main__":
    app.run(debug=True)
