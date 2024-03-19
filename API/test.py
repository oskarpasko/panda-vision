from flask import Flask
import pymysql

app = Flask(__name__)

hostname = 'localhost'
user = 'root'
password = 'oskarpasko'

# Initializing connection
db = pymysql.connections.Connection(
    host=hostname,
    user=user,
    password=password
)

@app.route('/greeting/<email>')
def give_greeting(email):
    cursor = db.cursor()
    cursor.execute(
        f"select * from pandavision.users where email='{email}';")
    db.commit()
    user = []

    for data in cursor:
        user.append(data)

    cursor.close()
    db.close()
    return f'<h1>Witaj {user[0][1]} {user[0][2]}!</h1>'