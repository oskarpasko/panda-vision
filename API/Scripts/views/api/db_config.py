import pymysql

# Database configuration
def get_db_connection():
    return pymysql.connect(
        host='localhost',        # Database host
        user='root',             # Database username
        password='admin',        # Database password
        db='pandavision',        # Database name
        cursorclass=pymysql.cursors.DictCursor
    )

if __name__ == '__main__':
    app.run(debug=True)