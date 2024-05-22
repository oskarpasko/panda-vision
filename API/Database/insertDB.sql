/* Dodanie kont podstawowych */
INSERT INTO users VALUES ('oskarpasko@gmail.com', 'Oskar', 'Paśko', '2000-02-12', '609553017', SHA2('oskarpasko2000', 256));
INSERT INTO users VALUES ('admin@gmail.com', 'Oskar', 'Paśko', '2000-02-12', '111111111', 'admin');

/* Dodanie przykładowego badania */
INSERT INTO pandavision.user_test VALUES(null, CURDATE(), 10, 10, 0, null, 'oskarpasko@gmail.com');

/* Dodanie przykłądowego rekordu do tabeli "color_test_user_results" */
insert into pandavision.color_test_user_results values(null, CURDATE(), "153", "czerowny, żółty", "oskarpasko@gmail.com");

/* Dodanie kolorów do tabelti color_test */
insert into pandavision.color_test values(null, 255, 0, 0, "Czerwony", "Pomarańczowy", "Niebieski", "Zielony");
insert into pandavision.color_test values(null, 0, 255, 0, "Zielony", "Pomarańczowy", "Niebieski", "Czerowony");
insert into pandavision.color_test values(null, 0, 0, 255, "Niebieski", "Pomarańczowy", "Zielony", "Czerowony");