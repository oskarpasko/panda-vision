from flask import Flask, request, jsonify, Blueprint
import pymysql

taint_test_result_blueprint = Blueprint('taint_test_result', __name__)

@taint_test_result_blueprint.route("/taint_test_result", methods=['POST'])
def taint_test_result():
    #data to connection with db
    hostname = 'localhost'
    user = 'root'
    password = 'admin'

    # Initializing connection
    db = pymysql.connections.Connection(
        host=hostname,
        user=user,
        password=password
    )

    # data from Unity getting thru POST method
    time = request.form['time']
    correct_colors = request.form['correct_colors']
    error_colors = request.form['error_colors']
    error_log = request.form['error_log']
    user = request.form['user']
    log = ''

    # Creating cursor object
    cursor = db.cursor()

    if error_log == '0':log = 'Red'
    elif error_log == '1': log = 'Green'
    elif error_log == '2': log = 'Blue'

    # Executing SQL query
    cursor.execute(f"INSERT INTO pandavision.taint_test_user_results VALUES (null, CURDATE(), '{time}', '{correct_colors}', '{error_colors}', '{log}', '{user}');")

    db.commit()
    return jsonify(), 200

    # Closing the cursor and connection to the database
    cursor.close()
    db.close()

if __name__ == "__main__":
    app.run(debug=True)