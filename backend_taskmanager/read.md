stept-1: npm init -y
stept-2: npm install express mysql2 pg dotenv bcryptjs jsonwebtoken cors helmet express-validator cookie-parser
step-3:npm install --save-dev nodemon
step-4: npm install sequelize mysql2 dotenv jsonwebtoken bcryptjs express cors body-parser

### -----

to run:npx nodemon server.js

## -------- to create the tables -------------------

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

select _ from ritik.users;
select _ from ritik.tasks;

## ------------------------------------

step-5: after create the table do coding and run the program :npx nodemon server.js
: npx create-react-app frontend_taskmanager
step-6: install the axis and react router : npm install react-router-dom axios
step-7: install below dependencies :
"axios": "^1.8.1",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-router-dom": "^7.2.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"

step-8: start coding for front-end
step-9: install the react-toastify: npm install react-toastify

step-10: run the project:npm start
