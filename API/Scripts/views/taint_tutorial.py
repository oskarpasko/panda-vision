from flask import request, jsonify, Blueprint
from .api.db_config import get_db_connection

taint_tutorial_blueprint = Blueprint('taint_tutorial', __name__)

@taint_tutorial_blueprint.route("/taint_tutorial", methods=['POST'])
def taint_tutorial():

    # Initializing connection
    db = get_db_connection()

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