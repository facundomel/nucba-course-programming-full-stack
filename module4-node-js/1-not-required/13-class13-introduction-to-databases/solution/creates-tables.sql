CREATE TABLE doctors (
	doctor_id bigint primary key auto_increment,
    name varchar(30) not null,
    last_name varchar(30) not null,
    created_date datetime
);

CREATE TABLE specialities (
	speciality_id bigint primary key auto_increment,
    name varchar(30) not null,
    description varchar(60)
);

CREATE TABLE doctors_specialities (
	doctor_id bigint not null,
    speciality_id bigint not null,
    
    constraint pk_doctor_speciality primary key (doctor_id, speciality_id)
);

CREATE TABLE pacients (
	pacient_id bigint primary key auto_increment,
    name varchar(30),
    last_name varchar(30),
    created_date datetime
);

CREATE TABLE contacts (
	contact_id bigint primary key auto_increment,
    type varchar(20) not null,
    contact varchar(50) not null,
    doctor_id bigint,
    pacient_id bigint,
    
    constraint fk_doctor foreign key (doctor_id) references doctors(doctor_id),
    constraint fk_pacient foreign key (pacient_id) references pacients(pacient_id)
);
