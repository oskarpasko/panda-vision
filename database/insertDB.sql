/* Dodanie kont podstawowych */

INSERT INTO users VALUES ('oskarpasko@gmail.com', 'Oskar', 'Paśko', '2000-02-12', '609553017', SHA2('oskarpasko2000', 256));

/* Dodanie przykładowego badania */

INSERT INTO pandavision.user_test VALUES(null, CURDATE(), 10, 10, 0, null, 'oskarpasko@gmail.com');
