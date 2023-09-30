CREATE DATABASE `JS_test`;

USE `JS_test`;

CREATE TABLE `user_data` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(255),
    `account` VARCHAR(50),
    `password` VARCHAR(255),
    `name` VARCHAR(20),
    `phone` VARCHAR(10),
    `age` INT,
    `address` VARCHAR(255),
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM `user_data`

