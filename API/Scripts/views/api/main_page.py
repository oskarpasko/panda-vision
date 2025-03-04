from flask import Flask, request, jsonify, Blueprint
import pymysql
from flask_cors import cross_origin
from .db_config import get_db_connection
from .queries.queries import QueryManager
from .queries.get_method import get_fetchone_suma_query

app = Flask(__name__)

# Define the Blueprint
api_main_page_blueprint = Blueprint('/api/main_page', __name__)

@api_main_page_blueprint.route('/api/main_page', methods=['POST'])
@cross_origin()
def get_data():
    data = request.get_json()
    user_username = data.get('username')  # Get the emusernameail from the POST request
    query_manager = QueryManager()

    if not user_username:
        return jsonify({'error': 'Ssername not provided'}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    # amount of all users
    users = get_fetchone_suma_query(cursor, query_manager.amount_all_users())  
    # amount of all tests
    tests = get_fetchone_suma_query(cursor, query_manager.amount_all_tests()) 
    # amount of time all tests
    tests_time = get_fetchone_suma_query(cursor, query_manager.total_test_time())  
    # % of correct anwsers
    corrects = get_fetchone_suma_query(cursor, query_manager.correct_test_points()) 

    # Close the connection with db
    cursor.close()
    connection.close()

    # Return all results in a single JSON response
    return jsonify({
        'users': users,
        'tests': tests,
        'tests_time': tests_time,
        'corrects': corrects
    })


if __name__ == "__main__":
    app.run(debug=True)
