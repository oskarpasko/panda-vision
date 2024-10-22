from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
from pymysql.cursors import DictCursor
from .db_config import get_db_connection

app = Flask(__name__)

# Define the Blueprint for the admin API
api_admin_blueprint = Blueprint('/api/admin', __name__)

# Get the amount of all users
def get_user_count(cursor):
    all_users_query = "SELECT COUNT(*) AS suma FROM pandavision.users WHERE role = 'user';"
    cursor.execute(all_users_query)
    return cursor.fetchone()['suma']
# Get the amount of all tests
def get_total_test_count(cursor):
    all_tests_query = """
        SELECT 
            (SELECT COUNT(*) FROM pandavision.color_test_user_results) +
            (SELECT COUNT(*) FROM pandavision.ishihara_test_results) +
            (SELECT COUNT(*) FROM pandavision.taint_test_user_results) AS suma;
    """
    cursor.execute(all_tests_query)
    return cursor.fetchone()['suma']
# Get the time of all tests
def get_total_test_time(cursor):
    all_tests_time_query = """
        SELECT 
            (SELECT SUM(time_of_test) FROM pandavision.color_test_user_results) +
            (SELECT SUM(time_of_test) FROM pandavision.ishihara_test_results) +
            (SELECT SUM(time_of_test) FROM pandavision.taint_test_user_results) AS suma;
    """
    cursor.execute(all_tests_time_query)
    return cursor.fetchone()['suma']
# Get the amount of all correct tests
def get_correct_test_count(cursor):
    correct_tests_query = """
        SELECT 
            (SELECT COUNT(*) FROM pandavision.color_test_user_results WHERE error_colors = 0) +
            (SELECT COUNT(*) FROM pandavision.ishihara_test_results WHERE error_colors = 0) +
            (SELECT COUNT(*) FROM pandavision.taint_test_user_results WHERE error_colors = 0) AS suma;
    """
    cursor.execute(correct_tests_query)
    return cursor.fetchone()['suma']
# Get the amount of all tests with at least 1 error
def get_error_test_count(cursor):
    error_tests_query = """
        SELECT 
            (SELECT COUNT(*) FROM pandavision.color_test_user_results WHERE error_colors > 0) +
            (SELECT COUNT(*) FROM pandavision.ishihara_test_results WHERE error_colors > 0) +
            (SELECT COUNT(*) FROM pandavision.taint_test_user_results WHERE error_colors > 0) AS suma;
    """
    cursor.execute(error_tests_query)
    return cursor.fetchone()['suma']
# Get al resulrs of color test
def get_color_test_user_results(cursor):
    error_tests_query = "SELECT * FROM pandavision.color_test_user_results;"
    cursor.execute(error_tests_query)
    return cursor.fetchall()
# Get all results of ishihara test
def get_ishihara_test_results(cursor):
    error_tests_query = "SELECT * FROM pandavision.ishihara_test_results;"
    cursor.execute(error_tests_query)
    return cursor.fetchall()
# Get all results of taint test
def get_taint_test_user_results(cursor):
    error_tests_query = "SELECT * FROM pandavision.taint_test_user_results;"
    cursor.execute(error_tests_query)
    return cursor.fetchall()

@api_admin_blueprint.route('/api/admin', methods=['POST'])
@cross_origin()
def get_data():
    # Get the incoming data from the POST request
    data = request.get_json()
    user_email = data.get('email')  # Extract email from the request

    if not user_email:
        return jsonify({'error': 'Email not provided'}), 400

    # Get the database connection
    connection = get_db_connection()

    # Use a context manager to ensure resources are cleaned up properly
    with connection.cursor(DictCursor) as cursor:
        # Retrieve counts from the database using the helper functions
        users = get_user_count(cursor)
        tests = get_total_test_count(cursor)
        tests_time = get_total_test_time(cursor)
        corrects = get_correct_test_count(cursor)
        bads = get_error_test_count(cursor)
        color_test = get_color_test_user_results(cursor)
        ishihara_test = get_ishihara_test_results(cursor)
        taint_test = get_taint_test_user_results(cursor)

    # Close the database connection
    connection.close()

    # Return the result as JSON
    return jsonify({
        'users': users,
        'tests': tests,
        'tests_time': round(tests_time / 60, 2),
        'correct_tests': round((corrects / tests) * 100, 2),
        'error_tests': round((bads / tests) * 100, 2),
        'color_test': color_test,
        'ishihara_test': ishihara_test,
        'taint_test': taint_test,
    }), 200
