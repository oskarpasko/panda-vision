from flask import Blueprint, jsonify
from pymongo import MongoClient
import numpy as np

color_test_blueprint = Blueprint('color_test', __name__)

@color_test_blueprint.route("/color_test", methods=["GET"])
def color_test():
    # Połączenie z MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    db = client["panda-vision"]
    collection = db["color_test"]

    # Pobranie wszystkich dokumentów
    documents = list(collection.find({}))

    # Przetworzenie danych do tablicy 2D
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

    # Przemieszanie tablicy
    np.random.shuffle(colors)

    # Zwrócenie danych jako JSON
    return jsonify(colors)

if __name__ == "__main__":
    app.run(debug=True)
