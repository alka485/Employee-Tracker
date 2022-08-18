Drop DATABASE if EXISTS employeelist_db;

CREATE DATABASE employeelist_db;

USE employeelist_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id) 
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL ,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);


CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE 
);