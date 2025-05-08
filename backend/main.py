from flask import Flask, jsonify
# from app.models import User
from flask_cors import CORS
from app import create_app

# app = Flask(__name__)
app = create_app()
CORS(app)

@app.route('/')
def hello_world():
    return "Hola Mundo"

if __name__ == '__main__':
    app.run(debug=True) #por defecto el puerto 5000 para flask