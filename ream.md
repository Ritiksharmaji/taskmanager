## --------- backend setup: ----------------

1. postman
2. nodejs
3. vs code
4. mysql
5. create two table in database those are below with code:

## --------------------------

CREATE TABLE ritik.users (
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT null

);

CREATE TABLE ritik.tasks (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(255) NOT NULL,
description TEXT,
status ENUM('pending', 'completed') DEFAULT 'pending',
userId INT,
dueDate DATETIME,  
 FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

### ------------------

6. create nodejs project by: npm init -y
7. install the requred dependecies:
   dependecies are :
   npm install express mysql2 pg dotenv bcryptjs jsonwebtoken cors helmet express-validator cookie-parser
   npm install --save-dev nodemon
   npm install sequelize mysql2 dotenv jsonwebtoken bcryptjs express cors body-parser
8. then start doing coding and testing

## ----------------------------------------------------------

## ----------------front-end code setup ------------------

1. install the react-js project:
