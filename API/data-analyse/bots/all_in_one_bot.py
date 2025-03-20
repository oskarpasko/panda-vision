from pymongo import MongoClient
import numpy as np
from sklearn.svm import OneClassSVM
import matplotlib.pyplot as plt

# === CONFIGURATION ===
HARD_THRESHOLDS = {
    "ishihara": 2,
    "color": 2,
    "taint": 4
}

test_collections = {
    "ishihara": "ishihara_test_results",
    "color": "color_test_user_results",
    "taint": "taint_test_user_results"
}

# === CONNECT TO MONGODB ===
client = MongoClient("mongodb://localhost:27017/")
db = client['panda-vision']

# === FETCH DATA FROM MONGODB ===
def fetch_data_from_mongodb(test_name, collection_name):
    pipeline = [
        {
            "$lookup": {
                "from": "users",
                "localField": "user",
                "foreignField": "login",
                "as": "user_info"
            }
        },
        {"$unwind": "$user_info"},
        {
            "$match": {
                "user_info.status": "zdiagnozowany",
                "user_info.condition": "brak schorzenia"
            }
        },
        {
            "$project": {
                "_id": 0,
                "time_of_test": 1,
                "error_colors": 1,
                "sex": "$user_info.gender"
            }
        }
    ]
    return list(db[collection_name].aggregate(pipeline))

# === SPLIT DATA BY GENDER ===
def split_data_by_gender(data):
    female_data, male_data = [], []
    for entry in data:
        time = entry.get('time_of_test')
        errors = entry.get('error_colors')
        gender = entry.get('sex')
        if time is None or errors is None or gender is None:
            continue
        point = [float(time), int(errors)]
        if gender.lower() == 'female':
            female_data.append(point)
        elif gender.lower() == 'male':
            male_data.append(point)
    return np.array(female_data), np.array(male_data)

# === TRAIN ONE-CLASS SVM MODEL ===
def train_model(data):
    if len(data) == 0:
        return None
    model = OneClassSVM(kernel='rbf', gamma='scale', nu=0.1)
    model.fit(data)
    return model

# === GET USER INPUT ===
def get_user_input():
    print("\n🔍 Enter test results for a new user:")
    while True:
        try:
            time_ishihara = float(input("Ishihara test time (s): "))
            errors_ishihara = int(input("Ishihara test errors: "))

            time_color = float(input("Color test time (s): "))
            errors_color = int(input("Color test errors: "))

            time_taint = float(input("Taint test time (s): "))
            errors_taint = int(input("Taint test errors: "))

            gender = input("Gender (male/female): ").strip().lower()
            if gender not in ['male', 'female']:
                print("❗ Please enter 'male' or 'female'")
                continue

            return {
                "gender": gender,
                "ishihara": [time_ishihara, errors_ishihara],
                "color": [time_color, errors_color],
                "taint": [time_taint, errors_taint]
            }
        except ValueError:
            print("❗ Invalid input format. Try again.")

# === ANALYZE A SINGLE POINT ===
def analyze_point(point, gender, model, training_data, test_name):
    X = np.array([point])
    threshold = HARD_THRESHOLDS[test_name]
    errors = point[1]

    if errors > threshold:
        status, color = "threshold", "orange"
    elif model is not None and model.predict(X)[0] == -1:
        status, color = "anomaly", "red"
    else:
        status, color = "healthy", "green"

    if training_data.size > 0:
        plt.scatter(training_data[:, 0], training_data[:, 1], color='blue', label='Healthy data')
    plt.scatter(X[0][0], X[0][1], color=color, edgecolors='black', s=100, label=f'New point: {status}')
    plt.xlabel("Test time (s)")
    plt.ylabel("Number of errors")
    plt.title(f"{test_name.capitalize()} ({gender})")
    plt.legend()
    plt.grid(True)
    plt.show()

    return status, color

# === MAIN PROGRAM ===
def main():
    print("📡 Fetching data from MongoDB...")
    models = {}
    data = {}

    for test, collection in test_collections.items():
        raw_data = fetch_data_from_mongodb(test, collection)
        female_data, male_data = split_data_by_gender(raw_data)
        data[test] = {"female": female_data, "male": male_data}
        models[test] = {
            "female": train_model(female_data),
            "male": train_model(male_data)
        }

    print("🧠 Models trained. Ready for user input...\n")

    while True:
        user_data = get_user_input()
        gender = user_data["gender"]
        results = {}

        for test in test_collections.keys():
            status, color = analyze_point(
                user_data[test],
                gender,
                models[test][gender],
                data[test][gender],
                test
            )
            results[test] = (status, color)

        print("\n📊 Summary:")
        for test, (status, _) in results.items():
            emoji = "🟢" if status == "healthy" else "🔴" if status == "anomaly" else "🟠"
            print(f"{emoji} {test.capitalize()}: {status}")

        again = input("\nCheck another user? (yes/no): ").strip().lower()
        if again not in ['yes', 'y', 'tak', 't']:
            print("👋 Done.")
            break

# === RUN ===
if __name__ == "__main__":
    main()
