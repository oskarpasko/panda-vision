import pymysql

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
cursor.execute("SELECT * FROM pandavision.users;")

# Displaying databases
for data in cursor:
    print(data)

# Closing the cursor and connection to the database
cursor.close()
db.close()