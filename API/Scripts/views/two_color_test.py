from flask import Blueprint, jsonify
from .api.db_config import get_mongo_connection
import numpy as np

two_color_test_blueprint = Blueprint('two_color_test', __name__)

@two_color_test_blueprint.route("/two_color_test", methods=["GET"])
def two_color_test():
    # Connect to MongoDB
    mongo_client = get_mongo_connection()
    db = mongo_client["panda-vision"]
    collection = db["two_color_test"]

    try:
        # Retrieve all documents from the collection
        documents = list(collection.find({}, {'_id': 0}))  # exclude _id field

        # Shuffle the data
        # np.random.shuffle(documents)

        # Return as JSON
        return jsonify(documents), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
