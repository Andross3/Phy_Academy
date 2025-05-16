from flask import jsonify

def login(request):
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
