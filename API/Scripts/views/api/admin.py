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
# Get details data from taint test
def get_taint_test_details(cursor):
    color_test_details = "SELECT count(*) as liczba, sum(time_of_test) as suma, AVG(error_colors) as srednia FROM taint_test_user_results;"
    cursor.execute(color_test_details)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia
# Get details data from taint test woth color red
def get_taint_test_red_details(cursor):
    color_test_details = "SELECT count(*) as liczba, sum(time_of_test) as suma, AVG(error_colors) as srednia FROM taint_test_user_results WHERE error_log = 'RED';"
    cursor.execute(color_test_details)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia
# Get details data from taint test woth color green
def get_taint_test_green_details(cursor):
    color_test_details = "SELECT count(*) as liczba, sum(time_of_test) as suma, AVG(error_colors) as srednia FROM taint_test_user_results WHERE error_log = 'GREEN';"
    cursor.execute(color_test_details)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia
# Get details data from taint test woth color blue
def get_taint_test_blue_details(cursor):
    color_test_details = "SELECT count(*) as liczba, sum(time_of_test) as suma, AVG(error_colors) as srednia FROM taint_test_user_results WHERE error_log = 'BLUE';"
    cursor.execute(color_test_details)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia
# Get details data from ishihara's test
def get_ishihara_test_details(cursor):
    color_test_details = "SELECT count(*) as liczba, sum(time_of_test) as suma, AVG(error_colors) as srednia FROM ishihara_test_results;"
    cursor.execute(color_test_details)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia
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
        # == GETTING MULTIPLE VARIABLES FROM QUERY ==   
        color_num, color_time, color_avg = get_color_test_details(cursor)                           # amount, time, avg errors of all color test
        taint_num, taint_time, taint_avg = get_taint_test_details(cursor)                           # amount, time, avg errors of all taint test
        ishihara_num, ishihara_time, ishiahara_avg = get_ishihara_test_details(cursor)              # amount, time, avg errors of all ishihara test
        taint_red_num, taint_red_time, taint_red_avg = get_taint_test_red_details(cursor)           # amount, time, `vg errors of red test in taint test`
        taint_green_num, taint_green_time, taint_green_avg = get_taint_test_green_details(cursor)   # amount, time, `vg errors of green test in taint test`
        taint_blue_num, taint_blue_time, taint_blue_avg = get_taint_test_blue_details(cursor)       # amount, time, `vg errors of blue test in taint test`
        age_brackets = get_users_brackets(cursor)                                                   # amount of users with age brackets

        # == GETTING SINGLE VARIABLE FROM QUERY ==
        # -- users --
        users = get_user_count(cursor)                           # amount of all users
        # -- age brackets --
        users_18 = age_brackets['users_18']                      # amount of users under 18 yo
        users_18_35 = age_brackets['users_18_35']                # amount of users between 18 and 35 yo
        users_36_60 = age_brackets['users_36_60']                # amount of users between 36 and 60 yo
        users_60 = age_brackets['users_60']                      # amount of users up to 60 yo
        # -- users sex --
        females = get_female_count(cursor)                       # amount of females users
        males = get_male_count(cursor)                           # amount of males users
        others = get_other_sex_count(cursor)                     # amount of users with other sex
        # -- general test stats --
        tests = get_total_test_count(cursor)                     # amount of all tests
        tests_time = get_total_test_time(cursor)                 # amount of all time during all tests
        corrects = get_correct_test_count(cursor)                # % of all correct answers
        bads = get_error_test_count(cursor)                      # % of all bad answers
        # -- all tests to display in table --
        color_test = get_color_test_user_results(cursor)         # all done color tests
        taint_test = get_taint_test_user_results(cursor)         # all done taint tests
        ishihara_test = get_ishihara_test_results(cursor)        # all done ishihara tests
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
        taint_test_red_avg = taint_red_avg                     # average errors in taint test with color red
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

    print(users_18[0]['suma'])

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
    }), 200
