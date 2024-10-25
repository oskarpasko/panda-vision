from flask import Flask, request, jsonify, Blueprint
import pymysql
from flask_cors import cross_origin
from .db_config import get_db_connection

app = Flask(__name__)

# Define the Blueprint
api_login_blueprint = Blueprint('/api/login', __name__)

# Route to check if the user is in the database
@api_login_blueprint.route("/api/login", methods=["POST"])
def check_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password are required"}), 400

    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT username, role FROM pandavision.users WHERE username = %s AND passwd = SHA2(%s, 256);"
            cursor.execute(sql, (username, password))
            user = cursor.fetchone()

            if user:
                user_data = {
                    "username": user['username'],
                    "role": user['role']  # Assuming 'role' is a field in the table
                }
                return jsonify({"success": True, "message": "User authenticated", "user": user_data}), 200
            else:
                return jsonify({"success": False, "message": "Invalid username or password"}), 401
    except Exception as e:
        return jsonify({"success": False, "message": f"Database error: {str(e)}"}), 500
    finally:
        if connection:
            connection.close()


if __name__ == "__main__":
    app.run(debug=True)
