from flask import Blueprint, jsonify
from pymongo import MongoClient
import numpy as np

color_test_blueprint = Blueprint('color_test', __name__)

@color_test_blueprint.route("/color_test", methods=["GET"])
def color_test():
    # Connect to MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    db = client["panda-vision"]
    collection = db["color_test"]

    # Retrieve all documents
    documents = list(collection.find({}))

    # Process the data into a 2D array
    colors = []
    for doc in documents:
        row = [
            doc.get("red", 0),
            doc.get("green", 0),
            doc.get("blue", 0),
            doc.get("correct_answer", ""),
            doc.get("incorrect_answer_A", ""),
            doc.get("incorrect_answer_B", ""),
            doc.get("incorrect_answer_C", "")
        ]
        colors.append(row)

    # Shuffle the array
    np.random.shuffle(colors)

    # Return the data as JSON
    return jsonify(colors)

if __name__ == "__main__":
    app.run(debug=True)
