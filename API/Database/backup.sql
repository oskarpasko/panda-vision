CREATE DATABASE `pandavision` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

use pandavision;

-- pandavision.users definition

CREATE TABLE `users` (
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `passwd` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date_of_birth` timestamp NOT NULL,
  `sex` enum('female','male','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'female',
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`username`),
  UNIQUE KEY `email_2` (`username`),
  UNIQUE KEY `email_3` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- pandavision.taint_test_user_results definition

CREATE TABLE `taint_test_user_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_of_test` timestamp NOT NULL,
  `time_of_test` varchar(10) NOT NULL,
  `correct_colors` varchar(255) DEFAULT NULL,
  `error_colors` varchar(255) DEFAULT NULL,
  `error_log` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `taint_test_user_results_ibfk_1` (`user`),
  CONSTRAINT `taint_test_user_results_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- pandavision.ishihara_test_results definition

CREATE TABLE `ishihara_test_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_of_test` timestamp NOT NULL,
  `time_of_test` varchar(10) NOT NULL,
  `correct_colors` varchar(255) DEFAULT NULL,
  `error_colors` varchar(255) DEFAULT NULL,
  `error_log` text,
  `user` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ishihara_test_results_ibfk_1` (`user`),
  CONSTRAINT `ishihara_test_results_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- pandavision.color_test_user_results definition

CREATE TABLE `color_test_user_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_of_test` timestamp NOT NULL,
  `time_of_test` varchar(10) NOT NULL,
  `correct_colors` varchar(255) DEFAULT NULL,
  `error_colors` varchar(255) DEFAULT NULL,
  `error_log` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `color_test_user_results_ibfk_1` (`user`),
  CONSTRAINT `color_test_user_results_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- pandavision.two_color_test_user_results definition

CREATE TABLE `two_color_test_user_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_of_test` timestamp NOT NULL,
  `time_of_test` varchar(10) NOT NULL,
  `correct_colors` varchar(255) DEFAULT NULL,
  `error_colors` varchar(255) DEFAULT NULL,
  `error_log` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `color_test_user_results_ibfk_1` (`user`),
  CONSTRAINT `two_color_test_user_results_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- pandavision.color_test definition

CREATE TABLE `color_test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `red` int NOT NULL,
  `green` int NOT NULL,
  `blue` int NOT NULL,
  `correct_answer` varchar(50) NOT NULL,
  `incorrect_answer_A` varchar(50) NOT NULL,
  `incorrect_answer_B` varchar(50) NOT NULL,
  `incorrect_answer_C` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `two_color_test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correct_red` int NOT NULL,
  `correct_green` int NOT NULL,
  `correct_blue` int NOT NULL,
  `incorrect_red` int NOT NULL,
  `incorrect_green` int NOT NULL,
  `incorrect_blue` int NOT NULL,
  `correct_answer` varchar(50) NOT NULL,
  `incorrect_answer` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* SIMPLE INSERTS */

INSERT INTO pandavision.color_test (red,green,blue,correct_answer,incorrect_answer_A,incorrect_answer_B,incorrect_answer_C) VALUES
	 (255,0,0,'Czerwony','Pomarańczowy','Niebieski','Zielony'),
	 (0,255,0,'Zielony','Pomarańczowy','Niebieski','Czerowony'),
	 (0,0,255,'Niebieski','Pomarańczowy','Zielony','Czerowony'),
	 (255,255,0,'Żółty','Pomarańczowy','Niebieski','Fioletowy'),
	 (255,0,190,'Różowy','Czerowny','Zielony','Niebieski'),
	 (233,0,255,'Fioletowy','Czerowny','Zielony','Żółty'),
	 (0,227,255,'Niebieski','Zielony','Fioletowy','Żółty'),
	 (240,67,67,'Czerwony','Żółty','Fioletowy','Niebieski'),
	 (67,144,255,'Niebieski','Zielony','Fioletowy','Czerwony'),
	 (232,236,62,'Żółty','Czerwony','Zielony','Fioletowy');

   INSERT INTO pandavision.two_color_test (correct_red,correct_green,correct_blue,incorrect_red,incorrect_green,incorrect_blue,correct_answer,incorrect_answer) VALUES
	 (247,88,88,88,247,88,'czerwony','zielony'),
	 (255,204,51,79,255,51,'pommarańczowy','zielony'),
	 (244,252,20,29,252,37,'żółty','zielony'),
	 (128,250,132,250,128,128,'zielony','czerwony'),
	 (143,222,104,222,210,104,'zielony','pomarańczowy'),
	 (77,242,137,231,242,77,'zielony','żółty'),
	 (255,0,0,0,0,0,'czerwony','czarny'),
	 (24,24,24,154,13,13,'czarny','czerwony'),
	 (252,245,49,252,184,49,'pomarańczowy','żółty'),
	 (128,255,81,250,255,81,'zielony','żółty');
INSERT INTO pandavision.two_color_test (correct_red,correct_green,correct_blue,incorrect_red,incorrect_green,incorrect_blue,correct_answer,incorrect_answer) VALUES
	 (249,249,11,249,201,11,'żółty','pomarańczowy'),
	 (247,243,121,155,247,121,'żółty','zielony'),
	 (248,252,138,252,150,138,'żółty','czerwony'),
	 (5,215,47,215,5,40,'zielony','czerwony'),
	 (243,73,101,118,243,73,'czerwony','zielony'),
	 (240,161,148,240,234,148,'czerwony','źółty'),
	 (193,32,252,47,32,252,'fioletowy','niebieski'),
	 (79,186,240,176,79,240,'niebieski','fioletowy'),
	 (162,38,38,162,154,38,'czerwony','brązowo-żółty'),
	 (171,159,3,171,3,3,'brązowo-żółty','czerwony');
INSERT INTO pandavision.two_color_test (correct_red,correct_green,correct_blue,incorrect_red,incorrect_green,incorrect_blue,correct_answer,incorrect_answer) VALUES
	 (197,249,195,247,249,195,'zielony','beżowy'),
	 (242,243,212,214,243,212,'beżowy','zielony'),
	 (169,181,255,169,255,184,'niebieski','zielony'),
	 (39,159,59,40,7,205,'zielony','niebieski'),
	 (250,250,38,245,15,15,'żółty','czerwony'),
	 (243,193,193,250,253,159,'czerwony','żółty'),
	 (159,206,253,159,253,212,'niebieski','zielony'),
	 (0,255,0,0,0,255,'zielony','niebieski'),
	 (247,255,0,255,0,0,'żółty','czerwony'),
	 (245,66,30,245,245,30,'czerwony','żółty');
INSERT INTO pandavision.two_color_test (correct_red,correct_green,correct_blue,incorrect_red,incorrect_green,incorrect_blue,correct_answer,incorrect_answer) VALUES
	 (97,233,48,48,159,233,'zielony','niebieski'),
	 (20,6,218,6,218,20,'niebieski','zielony'),
	 (240,253,56,188,56,253,'żółty','fioletowy'),
	 (255,255,16,222,222,214,'żółtly','szary'),
	 (174,13,206,206,206,13,'fioletowy','żółty'),
	 (154,154,148,247,247,159,'szary','żółty');


INSERT INTO pandavision.users (username,passwd,date_of_birth,sex,`role`) VALUES
	 ('oskarpasko','388aad61adc1b90ac3707d55ff6211d904125d5b39471a22fde89183baaeaa23','2000-10-26 00:00:00','male','admin'),
	 ('oskarpaskotest','388aad61adc1b90ac3707d55ff6211d904125d5b39471a22fde89183baaeaa23','2000-02-12 00:00:00','male','user');



