class QueryManager:
    @staticmethod
    def color_test_time_age_bracket(): # get avg time in color test for age brackets
        return """
        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '0-17' AS age_bracket
        FROM pandavision.color_test_user_results 
        LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '18-35' AS age_bracket
        FROM pandavision.color_test_user_results 
        LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '36-60' AS age_bracket
        FROM pandavision.color_test_user_results 
        LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '60+' AS age_bracket
        FROM pandavision.color_test_user_results 
        LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60;
        """
    @staticmethod
    def taint_test_time_age_bracket(): # get avg time in taint test for age brackets
        return """
        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '0-17' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '18-35' AS wiek_prage_bracketzedzial
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '36-60' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '60+' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60;
        """
    @staticmethod
    def ishihara_test_time_age_bracket(): # get avg time in iishihara test for age brackets
        return """
        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '0-17' AS age_bracket
        FROM pandavision.ishihara_test_results 
        LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '18-35' AS age_bracket
        FROM pandavision.ishihara_test_results 
        LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '36-60' AS age_bracket
        FROM pandavision.ishihara_test_results 
        LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '60+' AS age_bracket
        FROM pandavision.ishihara_test_results 
        LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60;
        """
    @staticmethod
    def taint_red_test_time_age_bracket(): # get avg time with red in taint test for age brackets
        return """
        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '0-17' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18 and error_log = 'RED'

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '18-35' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35 and error_log = 'RED'

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '36-60' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60 and error_log = 'RED'

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '60+' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60 and error_log = 'RED';
        """
    @staticmethod
    def taint_green_test_time_age_bracket(): # get avg time with green in taint test for age brackets
        return  """
        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '0-17' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18 and error_log = 'GREEN'

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '18-35' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35 and error_log = 'GREEN'

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '36-60' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60 and error_log = 'GREEN'

        UNION ALL

        SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '60+' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60 and error_log = 'GREEN';
        """
    @staticmethod
    def taint_blue_test_time_age_bracket(): # get avg time with blue in taint test for age brackets
        return  """
    SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '0-17' AS age_bracket
    FROM pandavision.taint_test_user_results 
    LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
    WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18 and error_log = 'BLUE'

    UNION ALL

    SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '18-35' AS age_bracket
    FROM pandavision.taint_test_user_results 
    LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
    WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35 and error_log = 'BLUE'

    UNION ALL

    SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '36-60' AS age_bracket
    FROM pandavision.taint_test_user_results 
    LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
    WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60 and error_log = 'BLUE'

    UNION ALL

    SELECT AVG(CONVERT(time_of_test, UNSIGNED)) AS time, '60+' AS age_bracket
    FROM pandavision.taint_test_user_results 
    LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
    WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60 and error_log = 'BLUE';
    """
    @staticmethod
    def color_test_error_age_bracket(): # get avg error during color test
        return """
        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '0-17' AS age_bracket
        FROM pandavision.color_test_user_results 
        LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18

        UNION ALL

        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '18-35' AS age_bracket
        FROM pandavision.color_test_user_results 
        LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35

        UNION ALL

        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '36-60' AS age_bracket
        FROM pandavision.color_test_user_results 
        LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60

        UNION ALL

        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '60+' AS age_bracket
        FROM pandavision.color_test_user_results 
        LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60;
        """
    @staticmethod
    def taint_test_error_age_bracket(): # get avg error during taint test
        return """
        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '0-17' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18

        UNION ALL

        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '18-35' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35

        UNION ALL

        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '36-60' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60

        UNION ALL

        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '60+' AS age_bracket
        FROM pandavision.taint_test_user_results 
        LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60;
        """
    @staticmethod
    def ishihara_test_error_age_bracket(): # get avg error during ishihara test
        return """
        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '0-17' AS age_bracket
        FROM pandavision.ishihara_test_results 
        LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18

        UNION ALL

        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '18-35' AS age_bracket
        FROM pandavision.ishihara_test_results 
        LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35

        UNION ALL

        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '36-60' AS age_bracket
        FROM pandavision.ishihara_test_results 
        LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60

        UNION ALL

        SELECT AVG(CONVERT(error_colors, UNSIGNED)) AS error, '60+' AS age_bracket
        FROM pandavision.ishihara_test_results 
        LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60;
        """
    @staticmethod
    def all_test_avG_time_age_bracket(): # get time of all test in age brackets
        return """
        SELECT AVG(total_time) AS time, '0-17' AS age_bracket
        FROM (
            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.color_test_user_results 
            LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18
            
            UNION ALL

            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.taint_test_user_results 
            LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18
            
            UNION ALL

            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.ishihara_test_results 
            LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) < 18
        ) AS combined_times

        UNION ALL

        SELECT AVG(total_time) AS time, '18-35' AS age_bracket
        FROM (
            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.color_test_user_results  
            LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35
            
            UNION ALL

            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.taint_test_user_results 
            LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35
            
            UNION all
            
            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.ishihara_test_results 
            LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 18 AND 35
        ) AS combined_times

        UNION ALL

        SELECT AVG(total_time) AS time, '36-60' AS age_bracket
        FROM (
            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.color_test_user_results 
            LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60
            
            UNION ALL

            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.taint_test_user_results 
            LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60
            
            UNION ALL

            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.ishihara_test_results 
            LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) BETWEEN 36 AND 60
        ) AS combined_times

        UNION ALL

        SELECT AVG(total_time) AS time, '60+' AS age_bracket
        FROM (
            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.color_test_user_results 
            LEFT JOIN pandavision.users ON color_test_user_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60
            
            UNION ALL

            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.taint_test_user_results 
            LEFT JOIN pandavision.users ON taint_test_user_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60
            
            UNION all
            
            SELECT CONVERT(time_of_test, UNSIGNED) AS total_time
            FROM pandavision.ishihara_test_results 
            LEFT JOIN pandavision.users ON ishihara_test_results.user = users.username 
            WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, CURDATE()) > 60
        ) AS combined_times;
        """

