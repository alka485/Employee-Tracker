//Import and require mysql2
const { table } = require('console');
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
                       'View All Roles',
                       'View All Employees',
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
            case 'View All Roles':
                 viewAllRoles();
                 break;
            case 'View All Employees':
                  viewAllEmployees();       
                 break;
            default:
                break;
        }
    });

    
const viewAllDepartment = async () =>{
    const department = await db.query("SELECT * FROM department");
    console.table(department);
    }

const viewAllRoles = async () =>{
    const role = await db.query(`SELECT role.id,
                                        role.title,
                                        department.name AS department,
                                        role.salaryFROM role JOIN department ON role.department_id=department.id`);
    console.table(role);    
}

const viewAllEmployees =async () => {
    const emp = await db.query(`SELECT employee.id,
                                       employee.first_name,
                                       employee.last_name, 
                                       role.title,
                                       department.name AS department,
                                       role.salary,CONCAT(e.first_name,' ',e.last_name ) AS manager 
                                       FROM employee 
                                       JOIN role ON employee.role_id = role.id
                                       JOIN department ON department.id = role.department_id
                                       LEFT JOIN employee e ON employee.manager_id = e.id`);
    console.table(emp);
}
