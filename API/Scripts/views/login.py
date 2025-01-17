from flask import request, jsonify, Blueprint
from .api.db_config import get_db_connection

login_blueprint = Blueprint('login', __name__)

@login_blueprint.route("/", methods=['POST'])
def login():
    # Initializing connection
    db = get_db_connection()

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