from flask import Flask
from flask_cors import CORS

from views.color_test import color_test_blueprint
from views.login import login_blueprint
from views.color_test_result import color_test_result_blueprint
from views.taint_test_result import taint_test_result_blueprint
from views.test import test_blueprint

app = Flask(__name__)

app.register_blueprint(color_test_blueprint)
app.register_blueprint(login_blueprint)
app.register_blueprint(color_test_result_blueprint)
app.register_blueprint(taint_test_result_blueprint)
app.register_blueprint(test_blueprint)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

if __name__ == '__main__':
    app.run(debug=True)