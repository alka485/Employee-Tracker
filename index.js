//Import and require mysql2
const mysql = require('mysql2');

const utils = require('util');

//Connect to database

const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username,
        user: 'root',
        //MySQL password
        password: 'alka@lucky16',
        database: 'employeelist_db'

    }
)

//select * from department;
