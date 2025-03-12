import mysql.connector
import numpy as np
from sklearn.svm import OneClassSVM
import matplotlib.pyplot as plt

# === CONFIGURATION ===
HARD_THRESHOLDS = {
    "ishihara": 2,
    "color": 2,
    "taint": 4
}

# === CONNECT TO DATABASE AND FETCH DATA ===
def fetch_data_from_database(test_name, table_name):
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='oskarpasko',
        database='pandavision'
    )
    cursor = conn.cursor()

    query = f"""
    SELECT time_of_test, error_colors, sex
    FROM pandavision.{table_name}
    LEFT JOIN pandavision.users ON {table_name}.user = users.username;
    """
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

# === SPLIT DATA BY GENDER ===
def split_data_by_gender(data):
    female_data, male_data = [], []
    for row in data:
        time, errors, gender = row
        if time is None or errors is None or gender is None:
            continue
        point = [float(time), int(errors)]
        if gender.lower() == 'female':
            female_data.append(point)
        elif gender.lower() == 'male':
            male_data.append(point)
    return np.array(female_data), np.array(male_data)

# === TRAIN THE MODEL ===
def train_model(data):
    if len(data) == 0:
        return None  # Jeśli brak danych, nie trenujemy modelu
    model = OneClassSVM(kernel='rbf', gamma='scale', nu=0.1)
    model.fit(data)
    return model

# === GET USER INPUT ===
def get_user_input():
    print("\n🔍 Wprowadź dane do analizy dla wszystkich testów:")
    while True:
        try:
            time_ishihara = float(input("Czas testu Ishihary (s): "))
            errors_ishihara = int(input("Liczba błędów w teście Ishihary: "))
            
            time_color = float(input("Czas testu Color (s): "))
            errors_color = int(input("Liczba błędów w teście Color: "))
            
            time_taint = float(input("Czas testu Taint (s): "))
            errors_taint = int(input("Liczba błędów w teście Taint: "))
            
            gender = input("Płeć (male/female): ").strip().lower()
            if gender not in ['male', 'female']:
                print("❗ Wpisz 'male' lub 'female'")
                continue
            
            return {
                "gender": gender,
                "ishihara": [time_ishihara, errors_ishihara],
                "color": [time_color, errors_color],
                "taint": [time_taint, errors_taint]
            }
        except ValueError:
            print("❗ Błąd formatu danych. Spróbuj jeszcze raz.")

# === ANALYZE RESULTS ===
def analyze_point(point, gender, model, training_data, test_name):
    X = np.array([point])
    threshold = HARD_THRESHOLDS[test_name]
    errors = point[1]
    
    if errors > threshold:
        status, color = "próg", "orange"
    elif model is not None and model.predict(X)[0] == -1:
        status, color = "anomalia", "red"
    else:
        status, color = "zdrowy", "green"
    
    # Sprawdzamy, czy są dane do rysowania
    if training_data.size > 0:
        plt.scatter(training_data[:, 0], training_data[:, 1], color='blue', label='Dane zdrowe')
    
    plt.scatter(X[0][0], X[0][1], color=color, edgecolors='black', s=100, label=f'Nowy punkt: {status}')
    plt.xlabel("Czas testu")
    plt.ylabel("Liczba błędów")
    plt.title(f"Analiza zdrowia ({test_name.capitalize()}, {gender})")
    plt.legend()
    plt.grid(True)
    plt.show()

    return status, color

# === MAIN PROGRAM ===
def main():
    print("📡 Pobieranie danych z bazy...")
    test_tables = {
        "ishihara": "ishihara_test_results",
        "color": "color_test_user_results",
        "taint": "taint_test_user_results"
    }
    
    models = {}
    data = {}
    
    for test, table in test_tables.items():
        raw_data = fetch_data_from_database(test, table)
        female_data, male_data = split_data_by_gender(raw_data)
        data[test] = {"female": female_data, "male": male_data}
        models[test] = {
            "female": train_model(female_data),
            "male": train_model(male_data)
        }
    
    print("🧠 Modele gotowe. Analiza użytkownika...")
    
    while True:
        user_data = get_user_input()
        gender = user_data["gender"]
        results = {}
        
        for test in test_tables.keys():
            result, color = analyze_point(user_data[test], gender, models[test][gender], data[test][gender], test)
            results[test] = (result, color)
        
        print("\n📊 Podsumowanie wyników:")
        for test, (result, color) in results.items():
            status_emoji = "🟢" if result == "zdrowy" else "🔴" if result == "anomalia" else "🟠"
            print(f"{status_emoji} {test.capitalize()}: {result}")
        
        continue_prompt = input("\nCzy chcesz sprawdzić kolejną osobę? (tak/nie): ").strip().lower()
        if continue_prompt not in ['tak', 't', 'yes', 'y']:
            print("👋 Zakończono.")
            break

if __name__ == "__main__":
    main()