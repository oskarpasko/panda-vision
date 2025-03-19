from flask import request, jsonify, Blueprint
from datetime import datetime
from .api.db_config import get_mongo_connection

color_test_result_blueprint = Blueprint('color_test_result', __name__)

@color_test_result_blueprint.route("/color_test_result", methods=['POST'])
def color_test_result():
    # Połączenie z Mongo
    mongo_client = get_mongo_connection()
    db = mongo_client["panda-vision"]
    collection = db["color_test_user_results"]

    # Pobranie danych z Unity (POST)
    try:
        time = float(request.form['time'])
        correct_colors = int(request.form['correct_colors'])
        error_colors = int(request.form['error_colors'])
        error_log = request.form.get('error_log', '')
        user = request.form['user']
    except (ValueError, KeyError) as e:
        return jsonify({"error": f"Invalid or missing data: {str(e)}"}), 400

    # Przygotowanie dokumentu do wstawienia
    result_document = {
        "date_of_test": datetime.utcnow(),  # aktualna data i czas
        "time_of_test": time,
        "correct_colors": correct_colors,
        "error_colors": error_colors,
        "error_log": error_log,
        "user": user
    }

    # Wstawienie do MongoDB
    collection.insert_one(result_document)

    return jsonify({"message": "Result saved successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)
