stept-1: npm
stept-2: npm install express mysql2 pg dotenv bcryptjs jsonwebtoken cors helmet express-validator cookie-parser
step-3:npm install --save-dev nodemon
step-4: npm install sequelize mysql2 dotenv jsonwebtoken bcryptjs express cors body-parser

to run:


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
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  userId INT,
  dueDate DATETIME,  
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);


select * from ritik.users;
select * from ritik.tasks;


drop table ritik.users;
drop table ritik.tasks;