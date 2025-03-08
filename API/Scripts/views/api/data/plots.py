from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
from ..db_config import get_db_connection
from .plot_2d import plot_2d
from .queries import color_test_plot_2d, taint_test_plot_2d, ishihara_test_plot_2d
import base64

app = Flask(__name__)

# Define the Blueprint
api_plots_blueprint = Blueprint('/api/plots', __name__)

@api_plots_blueprint.route('/api/plots', methods=['GET'])
@cross_origin()
def get_data():
    connection = get_db_connection()
    cursor = connection.cursor()

    # Wykonujemy zapytania i pobieramy dane
    cursor.execute(color_test_plot_2d())
    data1 = cursor.fetchall()

    cursor.execute(taint_test_plot_2d())
    data2 = cursor.fetchall()

    cursor.execute(ishihara_test_plot_2d())
    data3 = cursor.fetchall()

    cursor.close()
    connection.close()

    # Wygenerowanie wykresów dla każdego zapytania
    plot1 = plot_2d(data1, "Wykres wyników Testu Kolorów")
    plot2 = plot_2d(data2, "Wykres wyników Testu Barw")
    plot3 = plot_2d(data3, "Wykres wyników Testu Ishihary")

    # Konwersja wykresów do Base64
    plot1_base64 = base64.b64encode(plot1.getvalue()).decode('utf-8')
    plot2_base64 = base64.b64encode(plot2.getvalue()).decode('utf-8')
    plot3_base64 = base64.b64encode(plot3.getvalue()).decode('utf-8')

    return jsonify({
        'plot1': plot1_base64,
        'plot2': plot2_base64,
        'plot3': plot3_base64
    })

if __name__ == "__main__":
    app.run(debug=True)
