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
# Get the amount of females 
def get_female_count(cursor):
    females = "SELECT COUNT(*) AS suma FROM pandavision.users WHERE role = 'user' AND sex = 'female';"
    cursor.execute(females)
    return cursor.fetchone()['suma']
# Get the amount of males 
def get_male_count(cursor):
    males = "SELECT COUNT(*) AS suma FROM pandavision.users WHERE role = 'user' AND sex = 'male';"
    cursor.execute(males)
    return cursor.fetchone()['suma']
# Get the amount of other sex 
def get_other_sex_count(cursor):
    other_sex = "SELECT COUNT(*) AS suma FROM pandavision.users WHERE role = 'user' AND sex = 'other';"
    cursor.execute(other_sex)
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
# Get details data from color test
def get_color_test_details(cursor):
    color_test_details = "SELECT count(*) as liczba, sum(time_of_test) as suma, AVG(error_colors) as srednia FROM color_test_user_results;"
    cursor.execute(color_test_details)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia
#Get details data from taint test
def get_taint_test_details(cursor):
    color_test_details = "SELECT count(*) as liczba, sum(time_of_test) as suma, AVG(error_colors) as srednia FROM taint_test_user_results;"
    cursor.execute(color_test_details)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia
#Get details data from ishihara's test
def get_ishihara_test_details(cursor):
    color_test_details = "SELECT count(*) as liczba, sum(time_of_test) as suma, AVG(error_colors) as srednia FROM ishihara_test_results;"
    cursor.execute(color_test_details)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia

@api_admin_blueprint.route('/api/admin', methods=['POST'])
@cross_origin()
def get_data():
    # Get the incoming data from the POST request
    data = request.get_json()
    user_username = data.get('username')  # Extract username from the request

    if not user_username:
        return jsonify({'error': 'Username not provided'}), 400

    # Get the database connection
    connection = get_db_connection()

    # Use a context manager to ensure resources are cleaned up properly
    with connection.cursor(DictCursor) as cursor:
        color_num, color_time, color_avg = get_color_test_details(cursor)
        taint_num, taint_time, taint_avg = get_taint_test_details(cursor)
        ishihara_num, ishihara_time, ishiahara_avg = get_ishihara_test_details(cursor)
        # Retrieve counts from the database using the helper functions
        users = get_user_count(cursor)
        females = get_female_count(cursor)
        males = get_male_count(cursor)
        others = get_other_sex_count(cursor)
        tests = get_total_test_count(cursor)
        tests_time = get_total_test_time(cursor)
        corrects = get_correct_test_count(cursor)
        bads = get_error_test_count(cursor)
        color_test = get_color_test_user_results(cursor)
        color_test_num = color_num
        color_test_time = color_time
        color_test_avg = color_avg
        ishihara_test = get_ishihara_test_results(cursor)
        taint_test_num = taint_num
        taint_test_time = taint_time
        taint_test_avg = taint_avg
        taint_test = get_taint_test_user_results(cursor)
        ishihara_test_num = ishihara_num
        ishihara_test_time = ishihara_time
        ishihara_test_avg = ishiahara_avg

    # Close the database connection
    connection.close()

    # Return the result as JSON
    return jsonify({
        'users': users,
        'females': females,
        'males': males,
        'others': others,
        'tests': tests,
        'tests_time': round(tests_time / 60, 2),
        'correct_tests': round((corrects / tests) * 100, 2),
        'error_tests': round((bads / tests) * 100, 2),
        'color_test': color_test,
        'color_test_num': color_test_num,
        'color_test_time': round(color_test_time / 60, 2),
        'color_test_avg': round(color_test_avg, 2),
        'ishihara_test': ishihara_test,
        'ishihara_test_num': ishihara_test_num,
        'ishihara_test_time': round(ishihara_test_time / 60, 2),
        'ishihara_test_avg': round(ishihara_test_avg, 2),
        'taint_test': taint_test,
        'taint_test_num': taint_test_num,
        'taint_test_time': round(taint_test_time / 60, 2),
        'taint_test_avg': round(taint_test_avg, 2),
    }), 200
