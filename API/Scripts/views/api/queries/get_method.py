# Method to get results for charts
def get_chart_data(cursor, query):
    cursor.execute(query)
    results = cursor.fetchall()
    return results
# Method to get one data from fetchall()['suma']
def get_fetchone_suma_query(cursor, query):
    cursor.execute(query)
    return cursor.fetchone()['suma']
# Method to get all data from fetchall()
def get_fetchall(cursor, query):
    cursor.execute(query)
    return cursor.fetchall()
# Method to get detailes from tests
def get_tests_details(cursor, query): 
    cursor.execute(query)
    result = cursor.fetchone()
    liczba = result['liczba'] if 'liczba' in result else None
    time = result['suma'] if 'suma' in result else None
    srednia = result['srednia'] if 'srednia' in result else None
    return liczba, time, srednia