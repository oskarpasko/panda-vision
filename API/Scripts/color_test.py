from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

@app.route("/color_test",)
def color_test():
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
    cursor.execute(f"SELECT * FROM pandavision.color_test;")

    # Adding data from DB to the array
    for data in cursor:
        print(data[4])
        colors.append({
            "id": data[0],
            "red": data[1],
            "green": data[2],
            "blue": data[3],
            "correctAnswer": data[4],
            "incrorrectAnswerA": data[5],
            "incrorrectAnswerB": data[6],
            "incrorrectAnswerC": data[7]
        })

    # Closing the cursor and connection to the database
    cursor.close()
    db.close()

    # return 2D array of all colors
    return colors

if __name__ == "__main__":
    app.run(debug=True)