@staticmethod
def color_test_plot_2d():
    return """
SELECT time_of_test, error_colors, sex
FROM pandavision.color_test_user_results
LEFT JOIN pandavision.users ON color_test_user_results.user = users.username;
"""

@staticmethod
def taint_test_plot_2d():
    return """
    SELECT time_of_test, error_colors, sex
    FROM pandavision.taint_test_user_results
    LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username;
    """

@staticmethod
def ishihara_test_plot_2d():
    return """
SELECT time_of_test, error_colors, sex
FROM pandavision.ishihara_test_results
LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username;
"""