from flask import request, jsonify, Blueprint
from datetime import datetime
from .api.db_config import get_mongo_connection

ishihara_test_result_blueprint = Blueprint('ishihara_test_result', __name__)

@ishihara_test_result_blueprint.route("/ishihara_test_result", methods=['POST'])
def ishihara_test_result():
    # Connect to MongoDB
    mongo_client = get_mongo_connection()
    db = mongo_client["panda-vision"]
    collection = db["ishihara_test_results"]

    try:
        # Retrieve data from the form
        time = float(request.form.get('time'))
        correct_colors = int(request.form.get('correct_colors'))
        error_colors = int(request.form.get('error_colors'))
        error_log = request.form.get('error_log', '')
        user = request.form.get('user')

        # Create the document to insert
        document = {
            "date_of_test": datetime.utcnow(),
            "time_of_test": time,
            "correct_colors": correct_colors,
            "error_colors": error_colors,
            "error_log": error_log,
            "user": user
        }

        # Insert into MongoDB
        collection.insert_one(document)

        return jsonify({"message": "Result saved successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
