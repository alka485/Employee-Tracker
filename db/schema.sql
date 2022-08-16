Drop DATABASE if EXISTS employeelist_db;

CREATE DATABASE employeelist_db;

USE employeelist_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id) 
);

CREATE TABLE role(
    id INT ,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);