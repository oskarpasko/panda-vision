from flask import request, jsonify, Blueprint
from datetime import datetime
from dateutil import parser as date_parser
from .api.db_config import get_mongo_connection

two_color_test_result_blueprint = Blueprint('two_color_test_result', __name__)

@two_color_test_result_blueprint.route("/two_color_test_result", methods=['POST'])
def two_color_test_result():
    mongo_client = get_mongo_connection()
    db = mongo_client["panda-vision"]
    collection = db["two_color_test_user_results"]

    try:
        # Przyjmujemy JSON (Content-Type: application/json)
        data = request.get_json()

        # Wymagane pola
        time = float(data['time'])  # wymagane
        date_of_test = datetime.utcnow()  # automatycznie teraz

        # Opcjonalne pola
        user = data.get('user') or None
        genre = data.get('genre') or None

        dob_str = data.get('date_of_birth')
        date_of_birth = None
        if dob_str:
            try:
                date_of_birth = date_parser.parse(dob_str)
            except Exception:
                return jsonify({"error": "Invalid date_of_birth format"}), 400

        # Dokument do zapisania
        result_document = {
            "date_of_test": date_of_test,
            "time_of_test": time,
            "user": user,
            "genre": genre,
            "date_of_birth": date_of_birth
        }

        collection.insert_one(result_document)

        return jsonify({"message": "Result saved successfully"}), 200

    except KeyError as e:
        return jsonify({"error": f"Missing required field: {str(e)}"}), 400
    except ValueError as e:
        return jsonify({"error": f"Invalid data: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
