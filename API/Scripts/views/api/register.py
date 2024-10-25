from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
import pymysql
from .db_config import get_db_connection

app = Flask(__name__)

# Define the Blueprint
api_register_blueprint = Blueprint('/api/register', __name__)

# Registration endpoint
@api_register_blueprint.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validate input
    if not data or not all(key in data for key in ['username', 'dateOfBirth', 'gender', 'password']):
        return jsonify({'success': False, 'message': 'Missing fields'}), 400

    # Check if user already exists
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM pandavision.users WHERE username = %s", (data['username'],))
            existing_user = cursor.fetchone()
    finally:
        connection.close()

    if existing_user:
        return jsonify({'success': False, 'message': 'User already exists'}), 400

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO users VALUES (%s, SHA2(%s, 256), %s, %s, 'user')", 
                           (data['username'], data['password'], data['dateOfBirth'], data['gender']))

            connection.commit()
        return jsonify({'success': True, 'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
