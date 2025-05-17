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

## --------- convert to mongoose

npm install mongoose

Key Differences Between Sequelize & Mongoose
Feature Sequelize (SQL) Mongoose (MongoDB)
Finding a User by Email User.findOne({ where: { email } }) User.findOne({ email })
Primary Key user.id (auto-incremented) user.\_id (MongoDB ObjectId)
Creating a User User.create({ username, email, password }) User.create({ username, email, password })
Database Structure Uses tables and relations Uses documents and collections
Query Syntax SQL-style queries JSON-style queries

## -----------

Key Differences Between Sequelize & Mongoose
Feature Sequelize (SQL) Mongoose (MongoDB)
Finding a Task by ID Task.findOne({ where: { id, userId } }) Task.findOne({ \_id: id, userId })
Finding All Tasks Task.findAll({ where: { userId } }) Task.find({ userId })
Creating a Task Task.create({ title, description, status, dueDate, userId }) Task.create({ title, description, status, dueDate, userId })
Updating a Task task.update(req.body) Task.findOneAndUpdate({ \_id: id, userId }, req.body, { new: true })
Deleting a Task task.destroy() Task.findOneAndDelete({ \_id: id, userId })
Primary Key Uses id (Auto Increment) Uses \_id (MongoDB ObjectId)
Query Syntax SQL-style queries JSON-style queries


## ----------- websocket --
1) npm install socket.io
2) 