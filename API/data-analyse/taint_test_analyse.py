import pymysql
from plot_2d import plot_2d

# connect with db
db = pymysql.connect(
    host="localhost",    
    user="root",  
    password="oskarpasko",   
    database="pandavision"  
)
cursor = db.cursor()

# query
sql = """
SELECT time_of_test, error_colors, sex
FROM pandavision.taint_test_user_results
LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username;
"""

cursor.execute(sql)
data = cursor.fetchall()
cursor.close()
db.close()

# plot
plot_2d(data, 'Wykres wyników Testu Barw')