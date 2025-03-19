from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)

# Define the Blueprint
api_login_blueprint = Blueprint('/api/login', __name__)

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['panda-vision']
users_collection = db['users']

# Route to check if the user is in the database
@api_login_blueprint.route("/api/login", methods=["POST"])
@cross_origin()
def check_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password are required"}), 400

    try:
        user = users_collection.find_one({"login": username})
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            user_data = {
                "username": user['login'],
                "role": user.get('role', 'user')  # Default to 'user' if role is missing
            }
            return jsonify({"success": True, "message": "User authenticated", "user": user_data}), 200
        else:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401
    except Exception as e:
        return jsonify({"success": False, "message": f"Database error: {str(e)}"}), 500


if __name__ == "__main__":
    app.register_blueprint(api_login_blueprint)
    app.run(debug=True)
