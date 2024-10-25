from flask import Flask, request, jsonify, Blueprint
import pymysql
from flask_cors import cross_origin
from pymysql.cursors import DictCursor  # Import DictCursor
from .db_config import get_db_connection

app = Flask(__name__)

# Define the Blueprint
api_main_blueprint = Blueprint('/api/main', __name__)

@api_main_blueprint.route('/api/main', methods=['POST'])
@cross_origin()
def get_data():
    data = request.get_json()
    user_username = data.get('username')  # Get the emusernameail from the POST request

    if not user_username:
        return jsonify({'error': 'Ssername not provided'}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    # Query for the color test results
    query_colors = "SELECT * FROM pandavision.color_test_user_results WHERE user = %s"
    cursor.execute(query_colors, (user_username,))
    color_results = cursor.fetchall()

    # Query for the taint test results
    query_taints = "SELECT * FROM pandavision.taint_test_user_results WHERE user = %s"
    cursor.execute(query_taints, (user_username,))
    taint_results = cursor.fetchall()

    # Query for the Ishihara test results
    query_ishihara = "SELECT * FROM pandavision.ishihara_test_results WHERE user = %s"
    cursor.execute(query_ishihara, (user_username,))
    ishihara_results = cursor.fetchall()

    # Close the connection with db
    cursor.close()
    connection.close()

    # Return all results in a single JSON response
    return jsonify({
        'colors': color_results,
        'taints': taint_results,
        'ishihara': ishihara_results
    })


if __name__ == "__main__":
    app.run(debug=True)
