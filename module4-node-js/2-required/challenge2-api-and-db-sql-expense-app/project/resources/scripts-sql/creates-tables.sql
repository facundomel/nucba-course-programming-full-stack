CREATE TABLE expenses (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	description varchar(50),
	amount double(65, 2) NOT NULL,
	created_date datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_date datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	deleted_date datetime(6),
	user_id int NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	document_number int NOT NULL,
	created_date datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_date datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	deleted_date datetime(6),
	PRIMARY KEY (id)
);