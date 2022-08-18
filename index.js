//Import and require mysql2
const  inquirer = require('inquirer');
//const choices = require('inquirer/lib/objects/choices');
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
//select * from role;
//select * from employee;

//db.query = utils.promisify(db.query);

const questions =
    inquirer.prompt([
        {
            type : 'list',
            name : 'details',
            message: "What would you like to do?",
            choices: ['View All departments',
                       'View all roles',
                       'View all employees',
                       'Add a department',
                       'Add a role',
                       'Add an employee',
                       'Update an employee role',
                       'View employees by department',
                       'Delete a department',
                       'Delete a role',
                       'Delete an employee',
                       'No Action']
                
            
        }
    ]);

// const viewDepartment = async () =>{
//     const department = await db.query("Select * From department");
//     console.log();

// }    

// console.log(department);

// viewDepartment();