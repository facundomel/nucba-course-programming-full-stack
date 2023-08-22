INSERT INTO doctors (name, last_name, created_date) VALUES ("Juan", "Pérez", now());
INSERT INTO doctors (name, last_name, created_date) VALUES ("Pedro", "Aguilar", now());
INSERT INTO doctors (name, last_name, created_date) VALUES ("Carla", "Suárez", now());

INSERT INTO specialities (name) VALUES ("Oftalmología");
INSERT INTO specialities (name) VALUES ("Otorrinolaringología");

INSERT INTO doctors_specialities (doctor_id, speciality_id) VALUES (1, 1);
INSERT INTO doctors_specialities (doctor_id, speciality_id) VALUES (1, 2);
INSERT INTO doctors_specialities (doctor_id, speciality_id) VALUES (2, 2);
INSERT INTO doctors_specialities (doctor_id, speciality_id) VALUES (3, 1);

INSERT INTO pacients (name, last_name, created_date) VALUES ("Raúl", "Méndez", now());
INSERT INTO pacients (name, last_name, created_date) VALUES ("Juan Cruz", "Giménez", now());
INSERT INTO pacients (name, last_name, created_date) VALUES ("Azul", "Beluzo", now());

INSERT INTO contacts (type, contact, doctor_id) VALUES ("Celular", "1111111", 1);
INSERT INTO contacts (type, contact, doctor_id) VALUES ("Email", "a@hotmail.com", 2);
INSERT INTO contacts (type, contact, pacient_id) VALUES ("Telefono Fijo", "123456", 1);
INSERT INTO contacts (type, contact, pacient_id) VALUES ("Celular", "2222222", 2);