from flask import Blueprint
import pymysql
import numpy as np

two_color_test_blueprint = Blueprint('two_color_test', __name__)

@two_color_test_blueprint.route("/two_color_test",)
def two_color_test():
    # array to store all data from DB
    colors = []

    #data to connection with db
    hostname = 'localhost'
    user = 'root'
    password = 'oskarpasko'

    # Initializing connection
    db = pymysql.connections.Connection(
        host=hostname,
        user=user,
        password=password
    )

    # Creating cursor object
    cursor = db.cursor()

    # Executing SQL query
    cursor.execute(f"SELECT * FROM pandavision.two_color_test;")

    # Adding data from DB to the 2D array
    for data in cursor:
        new_row = [data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]]
        colors.append(new_row)

    # Deleting startup row aka first row (first row -> 0,0,0,0,0,0,0,0)
    #del(colors[0])

    # Shuffle the 2D array
    np.random.shuffle(colors)

    #print(colors)

    # Closing the cursor and connection to the database
    cursor.close()
    db.close()

    # return 2D array of all colors
    return colors

if __name__ == "__main__":
    app.run(debug=True)