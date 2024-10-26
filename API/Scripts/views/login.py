from flask import Flask, request, jsonify, Blueprint
import pymysql

login_blueprint = Blueprint('login', __name__)

@login_blueprint.route("/", methods=['POST'])
def login():
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

    # data from InputField from Unity getting thru POST method
    username = request.form['username']
    password = request.form['password']

    # Creating cursor object
    cursor = db.cursor()

    # Executing SQL query
    query = cursor.execute(f"SELECT username FROM pandavision.users WHERE username='{username}' AND passwd=SHA2('{password}', 256);")

    # checking if data are valid
    if query == 1:
        return jsonify(), 200 # if user exists in db
    else:
        return jsonify(), 401 # if user doesn't exist

    # Closing the cursor and connection to the database
    cursor.close()
    db.close()

if __name__ == "__main__":
    app.run(debug=True)