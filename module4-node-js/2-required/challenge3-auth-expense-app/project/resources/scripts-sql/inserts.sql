INSERT INTO users (first_name, last_name, email, password, role)
VALUES ("Juan", "Percara", "user@gmail.com", "1234", "user");

INSERT INTO users (first_name, last_name, email, password, role)
VALUES ("Javier", "Adauto", "user2@gmail.com", "1234", "user");

INSERT INTO users (first_name, last_name, email, password, role)
VALUES ("Facu", "Melgar", "admin@gmail.com", "5678", "admin");

INSERT INTO users (first_name, last_name, email, password, role)
VALUES ("Oscar", "Gimenez", "admin2@gmail.com", "5678", "admin");

INSERT INTO expenses (name, description, amount, user_id)
VALUES ("Campera", "Campera usada", 5000.65464, 1);

INSERT INTO expenses (name, description, amount, user_id)
VALUES ("Otra Campera", "Campera nueva", 6500, 1);

INSERT INTO expenses (name, description, amount, user_id)
VALUES ("Otra Campera", "Campera nueva", 6500, 2);

INSERT INTO expenses (name, description, amount, user_id)
VALUES ("Otra Campera", "Campera nueva", 6500, 3);