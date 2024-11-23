from flask import Flask, request, jsonify, Blueprint
import pymysql

taint_tutorial_blueprint = Blueprint('taint_tutorial', __name__)

@taint_tutorial_blueprint.route("/taint_tutorial", methods=['POST'])
def taint_tutorial():
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
    user = request.form['user']

    # Creating cursor object
    cursor = db.cursor()

    # Executing SQL query
    cursor.execute(f"INSERT INTO pandavision.tutorial_time VALUES (null, 'Taint Tutorial', '{time}', '{user}');")

    db.commit()
    return jsonify(), 200

if __name__ == "__main__":
    app.run(debug=True)