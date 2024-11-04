from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
from pymysql.cursors import DictCursor
from .db_config import get_db_connection
from .queries.queries import QueryManager

app = Flask(__name__)

# Define the Blueprint for the admin API
api_admin_blueprint = Blueprint('/api/admin', __name__)

# Get users age brackets
def get_users_brackets(cursor):
    queries = {
        "users_18": "SELECT COUNT(*) as suma FROM pandavision.users WHERE TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) < 18;",
        "users_18_35": "SELECT COUNT(*) as suma FROM pandavision.users WHERE TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) between 18 and 35;",
        "users_36_60": "SELECT COUNT(*) as suma FROM pandavision.users WHERE TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) between 36 and 60;",
        "users_60": "SELECT COUNT(*) as suma FROM pandavision.users WHERE TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) > 60;",
    }
    results = {}
    for key, query in queries.items():
        cursor.execute(query)
        results[key] = cursor.fetchall()
    return results

# Method to get results for charts
def get_chart_data(cursor, query):
    cursor.execute(query)
    results = cursor.fetchall()
    return results
# Method to get one data from fetchall()['suma']
def get_fetchone_suma_query(cursor, query):
    cursor.execute(query)
    return cursor.fetchone()['suma']
# Method to get all data from fetchall()
def get_fetchall(cursor, query):
    cursor.execute(query)
    return cursor.fetchall()
# Method to get detailes from tests
def get_tests_details(cursor, query): 
    cursor.execute(query)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia

@api_admin_blueprint.route('/api/admin', methods=['POST'])
@cross_origin()
def get_data():
    # Init class with queries
    query_manager = QueryManager()

    # Get the incoming data from the POST request
    data = request.get_json()
    user_username = data.get('username')  # Extract username from the request

    if not user_username:
        return jsonify({'error': 'Username not provided'}), 400

    # Get the database connection
    connection = get_db_connection()

    # Use a context manager to ensure resources are cleaned up properly
    with connection.cursor(DictCursor) as cursor:
        # == GETTING MULTIPLE VARIABLES FROM QUERY ==   
        age_brackets = get_users_brackets(cursor)                # amount of users with age brackets

        color_num, color_time, color_avg = get_tests_details(cursor, query_manager.get_color_test_details())                           # amount, time, avg errors of all color test
        taint_num, taint_time, taint_avg = get_tests_details(cursor, query_manager.get_taint_test_details())                           # amount, time, avg errors of all taint test
        ishihara_num, ishihara_time, ishiahara_avg = get_tests_details(cursor, query_manager.get_ishihara_test_details())              # amount, time, avg errors of all ishihara test
        taint_red_num, taint_red_time, taint_red_avg = get_tests_details(cursor, query_manager.get_taint_test_red_details())           # amount, time, `vg errors of red test in taint test`
        taint_green_num, taint_green_time, taint_green_avg = get_tests_details(cursor, query_manager.get_taint_test_green_details())   # amount, time, `vg errors of green test in taint test`
        taint_blue_num, taint_blue_time, taint_blue_avg = get_tests_details(cursor, query_manager.get_taint_test_blue_details())       # amount, time, `vg errors of blue test in taint test`
        
        # == CHARTS ==
        color_time_age_bracket_chart = get_chart_data(cursor, query_manager.color_test_time_age_bracket())                   # chart with time in age bracket in color test
        taint_time_age_bracket_chart = get_chart_data(cursor, query_manager.taint_test_time_age_bracket())                   # chart with time in age bracket in taint test    
        ishihara_time_age_bracket_chart = get_chart_data(cursor, query_manager.ishihara_test_time_age_bracket())             # chart with time in age bracket in ishihara test    
        taint_red_test_time_age_bracket_chart = get_chart_data(cursor, query_manager.taint_red_test_time_age_bracket())      # chart with time in age bracket in taint test (red)   
        taint_green_test_time_age_bracket_chart = get_chart_data(cursor, query_manager.taint_green_test_time_age_bracket())  # chart with time in age bracket in taint test (green)   
        taint_blue_test_time_age_bracket_chart = get_chart_data(cursor, query_manager.taint_blue_test_time_age_bracket())    # chart with time in age bracket in taint test (blue)   
        color_error_age_bracket_chart = get_chart_data(cursor, query_manager.color_test_error_age_bracket())                 # chart with error in age brackets in color test
        taint_error_age_bracket_chart = get_chart_data(cursor, query_manager.taint_test_error_age_bracket())                 # chart with error in age brackets in taint test
        ishiahra_error_age_bracket_chart = get_chart_data(cursor, query_manager.ishihara_test_error_age_bracket())           # chart with error in age brackets in ishihara test
        all_tests_avg_time_age_bracket_chart = get_chart_data(cursor, query_manager.all_test_avG_time_age_bracket())         # chart with time in all tests in age brackets 

        # == GETTING SINGLE VARIABLE FROM QUERY ==
        # -- age brackets --
        users_18 = age_brackets['users_18']             # amount of users under 18 yo
        users_18_35 = age_brackets['users_18_35']       # amount of users between 18 and 35 yo
        users_36_60 = age_brackets['users_36_60']       # amount of users between 36 and 60 yo
        users_60 = age_brackets['users_60']             # amount of users up to 60 yo
        # -- users --
        users = get_fetchone_suma_query(cursor, query_manager.amount_all_users())              # amount of all users
        # -- users sex --
        females = get_fetchone_suma_query(cursor, query_manager.amount_females())              # amount of females users
        males = get_fetchone_suma_query(cursor, query_manager.amount_males())                  # amount of males users
        others = get_fetchone_suma_query(cursor, query_manager.amount_other())                 # amount of users with other sex
        # -- general test stats --
        tests = get_fetchone_suma_query(cursor, query_manager.amount_all_tests())              # amount of all tests
        tests_time = get_fetchone_suma_query(cursor, query_manager.total_test_time())          # amount of all time during all tests
        corrects = get_fetchone_suma_query(cursor, query_manager.correct_test_points())        # % of all correct answers
        bads = get_fetchone_suma_query(cursor, query_manager.error_test_points())              # % of all bad answers
        # -- all tests to display in table --
        color_test = get_fetchall(cursor, query_manager.get_color_test_results())              # all done color tests
        taint_test = get_fetchall(cursor, query_manager.get_taint_test_results())              # all done taint tests
        ishihara_test = get_fetchall(cursor, query_manager.get_ishihara_test_results())        # all done ishihara tests
        # -- color test stats --
        color_test_num = color_num                               # amount of all done color tests
        color_test_time = color_time                             # time spend during color test
        color_test_avg = color_avg                               # average errors in color test
        # -- taint test stats --
        taint_test_num = taint_num                               # amount of all done taint tests
        taint_test_time = taint_time                             # time spend during taint test
        taint_test_avg = taint_avg                               # average errors in taint test
        # -- taint test stats with specific colors --
            # -- red --
        taint_test_red_num = taint_red_num                       # amount of all taint tests with color red
        taint_test_red_time = taint_red_time                     # time spend during taint test with color red
        taint_test_red_avg = taint_red_avg                       # average errors in taint test with color red
            # -- green --
        taint_test_green_num = taint_green_num                   # amount of all taint tests with color green
        taint_test_green_time = taint_green_time                 # time spend during taint test with color green
        taint_test_green_avg = taint_green_avg                   # average errors in taint test with color green
            # -- blue --
        taint_test_blue_num = taint_blue_num                     # amount of all taint tests with color blue
        taint_test_blue_time = taint_blue_time                   # time spend during taint test with color blue
        taint_test_blue_avg = taint_blue_avg                     # average errors in taint test with color blue
        # -- ishihara test stats --
        ishihara_test_num = ishihara_num                         # amount of all done ishihara tests
        ishihara_test_time = ishihara_time                       # time spend during ishihara test
        ishihara_test_avg = ishiahara_avg                        # average errors in ishihara test

    # Close the database connection
    connection.close()

    # Return the result as JSON
    return jsonify({
        'users': users,
        # -- age brackets --
        'users_18': users_18[0]['suma'],
        'users_18_35': users_18_35[0]['suma'],
        'users_36_60': users_36_60[0]['suma'],
        'users_60': users_60[0]['suma'],
        # -- users sex --
        'females': females,
        'males': males,
        'others': others,
        # -- general test stats --
        'tests': tests,
        'tests_time': round(tests_time / 60, 2),
        'correct_tests': round((corrects / tests) * 100, 2),
        'error_tests': round((bads / tests) * 100, 2),
        # -- all tests to display in table --
        'color_test': color_test,
        'ishihara_test': ishihara_test,
        'taint_test': taint_test,
        # -- color test stats --
        'color_test_num': color_test_num,
        'color_test_time': round(color_test_time / 60, 2),
        'color_test_avg': round(color_test_avg, 2),
        # -- taint test stats --
        'taint_test_num': taint_test_num,
        'taint_test_time': round(taint_test_time / 60, 2),
        'taint_test_avg': round(taint_test_avg, 2),
        # -- taint test stats with specific colors --
            # -- red --
        'taint_test_red_num': taint_test_red_num,
        'taint_test_red_time': round(taint_test_red_time / 60, 2),
        'taint_test_red_avg': round(taint_test_red_avg, 2),
            # -- green --
        'taint_test_green_num': taint_test_green_num,
        'taint_test_green_time': round(taint_test_green_time / 60, 2),
        'taint_test_green_avg': round(taint_test_green_avg, 2),
            # -- blue --
        'taint_test_blue_num': taint_test_blue_num,
        'taint_test_blue_time': round(taint_test_blue_time / 60, 2),
        'taint_test_blue_avg': round(taint_test_blue_avg, 2),
        # -- ishihara test stats --
        'ishihara_test_num': ishihara_test_num,
        'ishihara_test_time': round(ishihara_test_time / 60, 2),
        'ishihara_test_avg': round(ishihara_test_avg, 2),
        # -- charts --
        'color_time_age_bracket_chart': color_time_age_bracket_chart,
        'taint_time_age_bracket_chart': taint_time_age_bracket_chart,
        'ishihara_time_age_bracket_chart': ishihara_time_age_bracket_chart,
        'taint_red_test_time_age_bracket_chart': taint_red_test_time_age_bracket_chart,
        'taint_green_test_time_age_bracket_chart': taint_green_test_time_age_bracket_chart,
        'taint_blue_test_time_age_bracket_chart': taint_blue_test_time_age_bracket_chart,
        'color_error_age_bracket_chart': color_error_age_bracket_chart,
        'taint_error_age_bracket_chart': taint_error_age_bracket_chart,
        'ishiahra_error_age_bracket_chart': ishiahra_error_age_bracket_chart,
        'all_tests_avg_time_age_bracket_chart': all_tests_avg_time_age_bracket_chart,
    }), 200
