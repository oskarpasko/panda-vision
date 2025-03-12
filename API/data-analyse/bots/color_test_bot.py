import mysql.connector
import numpy as np
from sklearn.svm import OneClassSVM
import matplotlib.pyplot as plt

# === CONNECT TO DATABASE AND FETCH DATA ===
def fetch_data_from_database():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='oskarpasko',
        database='pandavision'
    )
    cursor = conn.cursor()

    query = """
    SELECT time_of_test, error_colors, sex
    FROM pandavision.color_test_user_results
    LEFT JOIN pandavision.users ON color_test_user_results.user = users.username;
    """
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

# === SPLIT DATA BY GENDER ===
def split_data_by_gender(data):
    female_data = []
    male_data = []
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
    model = OneClassSVM(kernel='rbf', gamma='scale', nu=0.1)
    model.fit(data)
    return model

# === CONSOLE INPUT INTERFACE ===
def get_user_input():
    print("\n🔍 Wprowadź dane do analizy:")
    while True:
        try:
            time = float(input("Czas testu (w sekundach): "))
            errors = int(input("Liczba błędów: "))
            gender = input("Płeć (male/female): ").strip().lower()
            if gender not in ['male', 'female']:
                print("❗ Wpisz 'male' lub 'female'")
                continue
            return {"time": time, "errors": errors, "gender": gender}
        except ValueError:
            print("❗ Błąd formatu danych. Spróbuj jeszcze raz.")

# === ANALYZE A SINGLE DATA POINT ===
def analyze_point(point, gender, model, training_data):
    X = np.array([[point["time"], point["errors"]]])

    # 🔴 HARD ERROR THRESHOLD
    if point["errors"] > 2:
        print("🔴 Osoba ma więcej niż 2 błędy – możliwe zaburzenia (twardy próg)")
        color = 'orange'
        status = "anomalia (próg)"
    else:
        prediction = model.predict(X)
        if prediction[0] == 1:
            print("🟢 Osoba prawdopodobnie zdrowa")
            color = 'green'
            status = "zdrowy"
        else:
            print("🔴 Osoba może mieć zaburzenia – analiza modelu")
            color = 'red'
            status = "anomalia (model)"

    # Visualization
    plt.scatter(training_data[:, 0], training_data[:, 1], color='blue', label='Dane zdrowe')
    plt.scatter(X[0][0], X[0][1], color=color, label=f'Nowy punkt: {status}')
    plt.xlabel("Czas testu")
    plt.ylabel("Liczba błędów")
    plt.title(f"Analiza zdrowia ({gender})")
    plt.legend()
    plt.grid(True)
    plt.show()

# === MAIN PROGRAM ===
def main():
    print("📡 Pobieranie danych z bazy...")
    raw_data = fetch_data_from_database()
    female_data, male_data = split_data_by_gender(raw_data)

    if len(female_data) == 0 or len(male_data) == 0:
        print("❌ Zbyt mało danych w bazie do analizy.")
        return

    print("🧠 Trening modeli...")
    model_female = train_model(female_data)
    model_male = train_model(male_data)

    while True:
        user_data = get_user_input()
        gender = user_data["gender"]

        if gender == "female":
            analyze_point(user_data, gender, model_female, female_data)
        else:
            analyze_point(user_data, gender, model_male, male_data)

        continue_prompt = input("Czy chcesz sprawdzić kolejną osobę? (tak/nie): ").strip().lower()
        if continue_prompt not in ['tak', 't', 'yes', 'y']:
            print("👋 Zakończono.")
            break

if __name__ == "__main__":
    main()
