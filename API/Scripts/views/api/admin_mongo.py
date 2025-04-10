from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
from pymongo import MongoClient
from bson.json_util import dumps
from bson import ObjectId

app = Flask(__name__)

# Define the Blueprint for the admin API
api_admin_mongo_blueprint = Blueprint('/api/admin_mongo', __name__)

# MongoDB client connection
client = MongoClient('mongodb://localhost:27017/') 
db = client['panda-vision'] 

# Nazwy kolekcji (tabel) w MongoDB

@api_admin_mongo_blueprint.route('/api/admin_mongo', methods=['GET'])
@cross_origin()
def get_all_data():
    # Fetch data from collections
    color_tests = list(db['color_test_user_results'].find({}))
    taint_tests = list(db['taint_test_user_results'].find({}))
    ishihara_tests = list(db['ishihara_test_results'].find({}))
    two_colors_tests = list(db['two_color_test_user_results'].find({}))
    
    # Convert ObjectId fields to string
    for test_list in [color_tests, taint_tests, ishihara_tests, two_colors_tests]:
        for test in test_list:
            test['_id'] = str(test['_id'])  # Convert ObjectId to string


    return jsonify({
        'color_tests': color_tests,
        'taint_tests': taint_tests,
        'ishihara_tests': ishihara_tests,
        'two_colors_tests': two_colors_tests,
    }), 200
