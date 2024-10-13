from flask import Flask, Blueprint, jsonify, send_from_directory
import pymysql
import os

ishihara_test_blueprint = Blueprint('ishihara_test', __name__)

# Set the directory where images are stored
IMAGE_FOLDER = os.path.join('API', 'Database', 'Images', 'Ishihara')

@ishihara_test_blueprint.route('/ishihara/images', methods=['GET'])
def get_image_list():
    # Data to connect with the database
    hostname = 'localhost'
    user = 'root'
    password = 'admin'
    database = 'pandavision'

    # Initializing connection
    db = pymysql.connect(
        host=hostname,
        user=user,
        password=password,
        database=database
    )

    # Creating cursor object
    cursor = db.cursor()

    # Fetch all images from the ishihara_test table
    cursor.execute("SELECT name FROM ishihara_test")
    images = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    db.close()
    
    # Generate the URLs for the images
    image_urls = [{'name': img[0], 'url': f"/ishihara/images/{img[0]}"} for img in images]
    
    return jsonify(image_urls)

@ishihara_test_blueprint.route('/ishihara/images/<string:image_name>', methods=['GET'])
def serve_image(image_name):
    # Serve the image from the specified folder
    return send_from_directory(IMAGE_FOLDER, image_name)

