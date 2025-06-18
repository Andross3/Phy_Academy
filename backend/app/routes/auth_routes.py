from flask import Blueprint, request, jsonify
from ..controllers.auth_controller import login

auth_bp = Blueprint("auth", __name__,url_prefix='/api')

@auth_bp.route("/login", methods=["POST"])
def login_route():
    return login(request)
