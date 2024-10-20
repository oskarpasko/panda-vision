from flask import Flask, request, jsonify, Blueprint
import pymysql
from flask_cors import cross_origin
from pymysql.cursors import DictCursor  # Import DictCursor
from .db_config import get_db_connection

app = Flask(__name__)

# Define the Blueprint
api_admin_blueprint = Blueprint('/api/admin', __name__)

@api_admin_blueprint.route('/api/admin', methods=['POST'])
@cross_origin()
def get_data():
    data = request.get_json()
    user_email = data.get('email')  # Get the email from the POST request

    if not user_email:
        return jsonify({'error': 'Email not provided'}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    # Query for the count of users
    all_users = "SELECT count(*) AS suma FROM pandavision.users WHERE role = 'user';"
    cursor.execute(all_users)
    users = cursor.fetchall()

    # Query for the taint test results
    all_tests = """
                    SELECT 
                        (SELECT count(*) FROM pandavision.color_test_user_results) +
                        (SELECT count(*) FROM pandavision.ishihara_test_results) +
                        (SELECT count(*) FROM pandavision.taint_test_user_results) AS suma;
                """
    cursor.execute(all_tests)
    tests = cursor.fetchall()

    # Close the connection with db
    cursor.close()
    connection.close()

    # Return all results in a single JSON response
    return jsonify({
        'users': users,
        'tests': tests,
    })


if __name__ == "__main__":
    app.run(debug=True)
