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
    if not data or not all(key in data for key in ['email', 'firstName', 'lastName', 'dateOfBirth', 'phoneNumber', 'password']):
        return jsonify({'success': False, 'message': 'Missing fields'}), 400

    # Check if user already exists
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM pandavision.users WHERE email = %s", (data['email'],))
            existing_user = cursor.fetchone()
    finally:
        connection.close()

    if existing_user:
        return jsonify({'success': False, 'message': 'User already exists'}), 400

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO users VALUES (%s, %s, %s, %s, %s, SHA2(%s, 256))", 
                           (data['email'], data['firstName'], data['lastName'], data['dateOfBirth'], data['phoneNumber'], data['password']))

            connection.commit()
        return jsonify({'success': True, 'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
