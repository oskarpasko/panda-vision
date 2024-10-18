from flask import Flask, request, jsonify, Blueprint
import pymysql
from flask_cors import cross_origin
from pymysql.cursors import DictCursor  # Import DictCursor

app = Flask(__name__)

# Define the Blueprint
api_main_blueprint = Blueprint('/api/main', __name__)

# MySQL connection configuration
def get_db_connection():
    return pymysql.connect(
        host='localhost',        # Database host
        user='root',             # Database username
        password='oskarpasko',     # Database password
        db='pandavision', # Database name
        cursorclass=DictCursor    # Use DictCursor to get results as dictionaries
    )

@api_main_blueprint.route('/api/main', methods=['POST'])
@cross_origin()
def get_data():
    print("START")
    data = request.get_json()
    user_email = data.get('email')  # Get the email from the POST request

    print(user_email)

    if not user_email:
        return jsonify({'error': 'Email not provided'}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    query = "SELECT * FROM pandavision.color_test_user_results WHERE user = %s"
    cursor.execute(query, (user_email,))  # Use parameterized query to prevent SQL injection
    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(results)  # Return the results as JSON

if __name__ == "__main__":
    app.run(debug=True)
