from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return jsonify(f"{200} - You've connected to the API!")

if __name__ == "__main__":
    app.run()