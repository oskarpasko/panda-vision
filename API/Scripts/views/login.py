from flask import request, jsonify, Blueprint
from .api.db_config import get_mongo_connection
import bcrypt

login_blueprint = Blueprint('login', __name__)

@login_blueprint.route("/", methods=['POST'])
def login():
    # Connect to MongoDB
    mongo_client = get_mongo_connection()
    db = mongo_client["panda-vision"]
    users_collection = db["users"]

    # Get data from the form
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    # Search for the user by username
    user = users_collection.find_one({"login": username})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        # Optionally return user data
        return jsonify({
            "message": "Login successful",
            "user": {
                "login": user['login'],
                "role": user.get('role'),
                "status": user.get('status'),
                "condition": user.get('condition')
            }
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401


if __name__ == "__main__":
    app.run(debug=True)
