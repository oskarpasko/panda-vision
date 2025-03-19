from flask import request, jsonify, Blueprint
from datetime import datetime
from .api.db_config import get_mongo_connection

taint_test_result_blueprint = Blueprint('taint_test_result', __name__)

@taint_test_result_blueprint.route("/taint_test_result", methods=['POST'])
def taint_test_result():

    # Establishing connection to MongoDB
    mongo_client = get_mongo_connection()
    db = mongo_client["panda-vision"]
    collection = db["taint_test_user_results"]

    # Data received from Unity through the POST method
    time = float(request.form.get('time'))
    correct_colors = int(request.form.get('correct_colors'))
    error_colors = int(request.form.get('error_colors'))
    error_log = request.form.get('error_log', '')
    user = request.form.get('user')
    
    # Mapping the error_log value to a color name
    log = ''
    if error_log == '0':
        log = 'Red'
    elif error_log == '1':
        log = 'Green'
    elif error_log == '2':
        log = 'Blue'

    # Preparing the document to insert into MongoDB
    result_document = {
        "date_of_test": datetime.utcnow(),  # current date and time
        "time_of_test": time,
        "correct_colors": correct_colors,
        "error_colors": error_colors,
        "error_log": log,
        "start_log": "",  # Empty start log
        "end_log": "",  # Empty end log
        "meantime": [],  # Empty meantime array
        "user": user
    }

    # Inserting the result into MongoDB
    collection.insert_one(result_document)

    # Returning a successful response
    return jsonify({"message": "Result saved successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)
