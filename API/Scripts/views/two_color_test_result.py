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
    users_collection = db["users"] 

    try:
        data = request.get_json()

        time = float(data['time'])  
        date_of_test = datetime.utcnow() 

        # Opcjonalne pola
        user = data.get('user') or None
        genre = data.get('genre') or None
        date_of_birth = None
        dob_str = data.get('date_of_birth')
        web_test = data.get('web_test')

        if dob_str:
            try:
                date_of_birth = date_parser.parse(dob_str)
            except Exception:
                return jsonify({"error": "Invalid date_of_birth format"}), 400

        if not genre and not date_of_birth:
            if user:
                user_data = users_collection.find_one({"login": user})
                if user_data:
                    if not genre:
                        genre = user_data.get("gender") 
                    if not date_of_birth:
                        date_of_birth = user_data.get("birthDate") 
                else:
                    return jsonify({"error": "User not found"}), 404

        # Dokument do zapisania
        result_document = {
            "date_of_test": date_of_test,
            "time_of_test": time,
            "user": user,
            "genre": genre,
            "date_of_birth": date_of_birth,
            "WebTest": web_test
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
