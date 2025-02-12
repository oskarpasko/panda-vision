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

INSERT INTO pandavision.users (username,passwd,date_of_birth,sex,`role`) VALUES
	 ('oskarpasko','388aad61adc1b90ac3707d55ff6211d904125d5b39471a22fde89183baaeaa23','2000-10-26 00:00:00','male','admin'),
	 ('oskarpaskotest','388aad61adc1b90ac3707d55ff6211d904125d5b39471a22fde89183baaeaa23','2000-02-12 00:00:00','male','user');



