//Import and require mysql2
const  inquirer = require('inquirer');
//const choices = require('inquirer/lib/objects/choices');
const mysql = require('mysql2');
const utils = require('util');

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
db.query = utils.promisify(db.query)

const questions =  inquirer.prompt([
        {
            type : 'list',
            name : 'choice',
            message: "What would you like to do?",
            choices: ['View All Departments',
                       'View all roles',
                       'View all employees',
                       'Add a department',
                       'Add a role',
                       'Add an employee',
                       'Update an employee role',
                       'No Action'],
                
        
        },       
    ])
    .then(answers => {
        const {choice} = answers;
        console.log(choice);
        switch (choice) {
            case 'View All Departments':
                viewAllDepartment();
                break;
        
            default:
                break;
        }
    });

    
const viewAllDepartment = async () =>{
    const department = await db.query("SELECT * FROM department");
    console.table(department);
    
}

