import pymysql
from pymongo import MongoClient

def get_mongo_connection():
    return MongoClient("mongodb://localhost:27017/")


# Database configuration
def get_db_connection():
    return pymysql.connect(
        host='localhost',        # Database host
        user='root',             # Database username
        password='oskarpasko',        # Database password
        db='pandavision',        # Database name
        cursorclass=pymysql.cursors.DictCursor
    )

if __name__ == '__main__':
    app.run(debug=True)