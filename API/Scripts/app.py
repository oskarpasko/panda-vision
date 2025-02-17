from flask import Flask
from flask_cors import CORS

from views.color_test import color_test_blueprint
from views.two_color_test import two_color_test_blueprint
from views.two_color_test_result import two_color_test_result_blueprint
from views.login import login_blueprint
from views.color_test_result import color_test_result_blueprint
from views.taint_test_result import taint_test_result_blueprint
from views.taint_tutorial import taint_tutorial_blueprint
from views.ishihara_test_result import ishihara_test_result_blueprint
from views.ishihara_tutorial import ishihara_tutorial_blueprint
from views.api.login import api_login_blueprint
from views.api.main import api_main_blueprint
from views.api.register import api_register_blueprint
from views.api.admin import api_admin_blueprint

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app, resources={r"/*": {"origins": "*"}})

# Register Blueprints
app.register_blueprint(login_blueprint)

app.register_blueprint(color_test_blueprint)
app.register_blueprint(color_test_result_blueprint)

app.register_blueprint(two_color_test_blueprint)
app.register_blueprint(two_color_test_result_blueprint)

app.register_blueprint(taint_test_result_blueprint)
app.register_blueprint(taint_tutorial_blueprint)

app.register_blueprint(ishihara_test_result_blueprint)
app.register_blueprint(ishihara_tutorial_blueprint)

app.register_blueprint(api_login_blueprint)
app.register_blueprint(api_main_blueprint)
app.register_blueprint(api_register_blueprint)
app.register_blueprint(api_admin_blueprint)

app.config['CORS_HEADERS'] = 'Content-Type'

if __name__ == '__main__':
    app.run(debug=True)