from flask import Flask

from views.color_test import color_test_blueprint
from views.login import login_blueprint

app = Flask(__name__)

app.register_blueprint(color_test_blueprint)
app.register_blueprint(login_blueprint)

if __name__ == '__main__':
    app.run(debug=True)