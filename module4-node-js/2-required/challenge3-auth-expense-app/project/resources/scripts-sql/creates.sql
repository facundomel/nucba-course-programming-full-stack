CREATE DATABASE expenses_nucba_challenge_required_3_module_4;

CREATE TABLE `expenses` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	`description` varchar(50) DEFAULT NULL,
	`amount` double(65, 2) NOT NULL,
	`created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_date` datetime DEFAULT NULL,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
	`id` int NOT NULL AUTO_INCREMENT,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL,
	`password` varchar(100) NOT NULL,
	`role` enum('admin', 'user') NOT NULL DEFAULT 'user',
	`created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_date` datetime DEFAULT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
)