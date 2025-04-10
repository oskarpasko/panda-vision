from flask import request, jsonify, Blueprint
from datetime import datetime
from dateutil import parser as date_parser
from .api.db_config import get_mongo_connection

ishihara_test_result_blueprint = Blueprint('ishihara_test_result', __name__)

@ishihara_test_result_blueprint.route("/ishihara_test_result", methods=['POST'])
def ishihara_test_result():
    # Connect to MongoDB
    mongo_client = get_mongo_connection()
    db = mongo_client["panda-vision"]
    collection = db["ishihara_test_results"]
    users_collection = db["users"]

    try:
        data = request.get_json()
        print("Incoming data:", data)

        # Required fields
        time = float(data['time'])

        # Optional fields with defaults
        correct_colors = int(data.get('correct_colors', 0))
        error_colors = int(data.get('error_colors', 0))
        error_log = data.get('error_log', '')
        user = data.get('user') or None
        genre = data.get('genre') or None
        dob_str = data.get('date_of_birth')
        web_test = data.get('web_test')

        # Validate types for optional fields
        if genre and not isinstance(genre, str):
            return jsonify({"error": "Invalid genre type"}), 400
        if web_test is not None and not isinstance(web_test, bool):
            return jsonify({"error": "web_test must be a boolean"}), 400

        # Parse date_of_birth if provided
        date_of_birth = None
        if dob_str:
            try:
                date_of_birth = date_parser.parse(dob_str)
            except Exception:
                return jsonify({"error": "Invalid date_of_birth format"}), 400

        # Fallback to user profile if genre or birth date missing
        if (not genre or not date_of_birth) and user:
            user_data = users_collection.find_one({"login": user})
            if user_data:
                if not genre:
                    genre = user_data.get("gender")
                if not date_of_birth:
                    date_of_birth = user_data.get("birthDate")
                    if isinstance(date_of_birth, str):
                        try:
                            date_of_birth = date_parser.parse(date_of_birth)
                        except Exception:
                            return jsonify({"error": "Invalid birthDate format in DB"}), 400
            else:
                return jsonify({"error": "User not found"}), 404

        # Create document for MongoDB
        document = {
            "date_of_test": datetime.utcnow(),
            "time_of_test": time,
            "correct_colors": correct_colors,
            "error_colors": error_colors,
            "error_log": error_log,
            "user": user,
            "genre": genre,
            "date_of_birth": date_of_birth,
            "WebTest": web_test
        }

        print("Final document to insert:", document)

        # Insert into MongoDB
        collection.insert_one(document)

        return jsonify({"message": "Result saved successfully"}), 200

    except KeyError as e:
        return jsonify({"error": f"Missing required field: {str(e)}"}), 400
    except ValueError as e:
        return jsonify({"error": f"Invalid data: {str(e)}"}), 400
    except Exception as e:
        print("Unexpected error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
