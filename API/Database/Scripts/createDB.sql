/* Script to create schema of DB */

CREATE DATABASE pandavision;

USE pandavision;

/* Table with users */
CREATE TABLE users(
	email VARCHAR(100) PRIMARY KEY NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	date_of_birth TIMESTAMP NOT NULL,
	phone VARCHAR(9) NOT NULL CHECK(char_length(phone) = 9),
	passwd CHAR(64) NOT NULL
);

/* Table with results of test ColorTest */
CREATE TABLE color_test_user_results(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	date_of_test TIMESTAMP NOT NULL,
	time_of_test VARCHAR(10) NOT NULL,
	correct_colors VARCHAR(255),
	error_colors VARCHAR(255),
	user VARCHAR(100) NOT NULL,
	FOREIGN KEY (user) REFERENCES users(email)
);

/* Table with results of TaintTest */
CREATE TABLE taint_test_user_results(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	date_of_test TIMESTAMP NOT NULL,
	time_of_test VARCHAR(10) NOT NULL,
	correct_colors VARCHAR(255),
	error_colors VARCHAR(255),
	user VARCHAR(100) NOT NULL,
	FOREIGN KEY (user) REFERENCES users(email)
);

/* Table with colors to ColorTest */
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

/* Table with images to the Ishihara Test */
CREATE TABLE ishihara_test(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(100) NOT null,
	correct_answer VARCHAR(50) NOT NULL
);
