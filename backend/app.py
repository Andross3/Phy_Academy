from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
CORS(app)

@app.route("/")
def serve_home():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_static(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

@app.route("/api/ping")
def ping():
    return jsonify({"message": "pong desde Flask"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)

