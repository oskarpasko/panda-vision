from flask import Flask, request, jsonify, Blueprint
import pymysql
from flask_cors import cross_origin

app = Flask(__name__)

# Define the Blueprint
api_login_blueprint = Blueprint('/api/login', __name__)

# MySQL connection configuration
def get_db_connection():
    return pymysql.connect(
        host='localhost',        # Database host
        user='root',             # Database username
        password='admin',     # Database password
        db='pandavision', # Database name
        cursorclass=pymysql.cursors.DictCursor
    )

# Route to check if the user is in the database
@api_login_blueprint.route("/api/login", methods=["POST"])
def check_user():
    data = request.get_json()  # Get the POSTed data
    email = data.get('email')
    password = data.get('password')

    # Ensure email and password are provided
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    connection = None  # Initialize the connection variable
    try:
        # Connect to the database
        connection = get_db_connection()
        with connection.cursor() as cursor:
            # Query to find user by email and password (you should hash passwords in a real app)
            sql = "SELECT * FROM pandavision.users WHERE email = %s AND passwd = SHA2(%s, 256);"
            cursor.execute(sql, (email, password))
            user = cursor.fetchone()

            if user:
                # If user is found, return success
                return jsonify({"success": True, "message": "User authenticated", "user": user}), 200
            else:
                # If no user is found, return failure
                return jsonify({"success": False, "message": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"success": False, "message": f"Database error: {str(e)}"}), 500
    finally:
        if connection:
            connection.close()  # Close the connection only if it was successfully opened

if __name__ == "__main__":
    app.run(debug=True)
