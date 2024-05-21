/* Tworzenie tabel do bazy danych */

CREATE DATABASE pandavision;

USE pandavision;

/* Tabela z uytkownikami */
CREATE TABLE users(
	email VARCHAR(100) PRIMARY KEY NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	date_of_birth TIMESTAMP NOT NULL,
	phone VARCHAR(9) NOT NULL CHECK(char_length(phone) = 9),
	passwd CHAR(64) NOT NULL
);

/* Tabela zapisująca badania uzytkownikow */
CREATE TABLE user_test(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	date_of_test TIMESTAMP NOT NULL,
	points INT NOT NULL,
	time_of_test INT NOT NULL,
	mistake INT NOT NULL,
	tracker BLOB,
	user VARCHAR(100) NOT NULL,
	FOREIGN KEY (user) REFERENCES users(email)
);

/* Table zapisująca wyniki badania rozpoznawania koloru z Canvasu */
CREATE TABLE color_test_user_results(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	date_of_test TIMESTAMP NOT NULL,
	time_of_test VARCHAR(10) NOT NULL,
	error_colors VARCHAR(255),
	user VARCHAR(100) NOT NULL,
	FOREIGN KEY (user) REFERENCES users(email)
);

/* Tabela zawierająca dane kolorów użytych do testu ColorTest */
CREATE TABLE color_test(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	red INT(3) NOT NULL,
	green INT(3) NOT NULL,
	blue INT(3) NOT NULL,
	correct_answer VARCHAR(50) NOT NULL,
	incorrect_answer_A VARCHAR(50) NOT NULL,
	incorrect_answer_B VARCHAR(50) NOT NULL,
	incorrect_answer_C VARCHAR(50) NOT NULL
);