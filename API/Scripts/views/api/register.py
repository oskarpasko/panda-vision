from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
from pymongo import MongoClient
import bcrypt
from datetime import datetime

app = Flask(__name__)

# Blueprint
api_register_blueprint = Blueprint('/api/register', __name__)

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['panda-vision']
users_collection = db['users']

# Registration endpoint
@api_register_blueprint.route('/api/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()

    # Input validation
    if not data or not all(key in data for key in ['username', 'dateOfBirth', 'gender', 'password']):
        return jsonify({'success': False, 'message': 'Missing fields'}), 400

    # Check if user already exists
    existing_user = users_collection.find_one({'login': data['username']})
    if existing_user:
        return jsonify({'success': False, 'message': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Parse date of birth
    try:
        birth_date = datetime.strptime(data['dateOfBirth'], '%Y-%m-%d')
    except ValueError:
        return jsonify({'success': False, 'message': 'Invalid birth date format. Use YYYY-MM-DD'}), 400

    # Create the user document
    user_doc = {
        "login": data['username'],
        "password": hashed_password.decode('utf-8'),
        "birthDate": birth_date,
        "gender": data['gender'],
        "role": "user",
        "status": "niezdiagnozowany",      
        "condition": "brak schorzenia"      
    }

    try:
        users_collection.insert_one(user_doc)
        return jsonify({'success': True, 'message': 'User registered successfully'}), 201
    except Exception as e:
        print("Registration error:", e)
    return jsonify({'success': False, 'message': 'Internal server error'}), 500

if __name__ == '__main__':
    app.register_blueprint(api_register_blueprint)
    app.run(debug=True)
