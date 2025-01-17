from flask import request, jsonify, Blueprint
from .api.db_config import get_db_connection

ishihara_tutorial_blueprint = Blueprint('ishihara_tutorial', __name__)

@ishihara_tutorial_blueprint.route("/ishihara_tutorial", methods=['POST'])
def ishihara_tutorial():

    # Initializing connection
    db = get_db_connection()

    # data from Unity getting thru POST method
    time = request.form['time']
    user = request.form['user']

    # Creating cursor object
    cursor = db.cursor()

    # Executing SQL query
    cursor.execute(f"INSERT INTO pandavision.tutorial_time VALUES (null, 'Ishihara Tutorial', '{time}', '{user}');")

    db.commit()
    return jsonify(), 200

if __name__ == "__main__":
    app.run(debug=True)