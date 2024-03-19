import pymysql

time = input("podaj czas w sekundach")
mistake = input("podaj ilosc bledow")
points = 0

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
cursor.execute("INSERT INTO pandavision.user_test VALUES(null, CURDATE(), 10, 10, 0, null, 'oskarpasko@gmail.com');")
db.commit()

# Displaying databases
# for data in cursor:
#     print(data)

# Closing the cursor and connection to the database
cursor.close()
db.close()