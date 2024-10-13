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

email = 'oskarpasko@gmail.com'
password = 'oskarpasko2000'

# Creating cursor object
cursor = db.cursor()

# Executing SQL query
query = cursor.execute(f"SELECT email FROM pandavision.users WHERE email='{email}' AND passwd=SHA2('{password}', 256);")

if query == 1:
    print("Zalogowano!")
else:
    print("Złe dane!")

# Closing the cursor and connection to the database
cursor.close()
db.close()