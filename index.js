//Import and require mysql2
const { table } = require('console');
const inquirer = require('inquirer');
//const choices = require('inquirer/lib/objects/choices');
const mysql = require('mysql2');
const { type } = require('os');
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

startPrompt();
function startPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: "What would you like to do?",
            choices: ['View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add an employee',
                'Update an employee role',
                'No Action'],
        },
    ])
        .then(answers => {
            const { choice } = answers;
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
                case 'Add Department':
                    addDepartment();
                case 'Add Role':
                    addRole();
                default:
                    break;
            }
        });
}

const viewAllDepartment = async () => {
    const department = await db.query("SELECT * FROM department");
    console.table(department);
    startPrompt();
}

const viewAllRoles = async () => {
    const role = await db.query(`SELECT role.id,
                                        role.title,
                                        department.name AS department,
                                        role.salary
                                        FROM role 
                                        JOIN department ON role.department_id=department.id`);
    console.table(role);
    startPrompt();
}

const viewAllEmployees = async () => {
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
    startPrompt();
}

const addDepartment = async () => {

    const answers = await inquirer.prompt([
        {
            message: "What is the name of the department?",
            name: "dept",
            type: "input"
        }
    ]);

    await db.query(
        `INSERT INTO department(name) VALUES(?)`,
        [answers.dept]


    );
    console.log("Added " + answers.dept + " to the database");

    startPrompt();

}

const addRole = async () => {
    const department = await db.query("SELECT * FROM department");
    //console.table(department);
    const userChoices = department.map(name => {
        name: department.name
        value: department.id
        
   })
//userChoices.push(name);
console.log(userChoices);
        const answers = await inquirer.prompt([
        {
            message: "What is the name of the role?",
            name: "role",
            type: "input"
        },
        {
            message: "What is the salary of the role?",
            name: "sal",
            type: "input"
        },
        {
            message: "Which department does the role belong to?",
            name: "dept",
            type: "list",
            choices: userChoices
        }
     ]);

    await db.query(
        `INSERT INTO role(title,salary,department_id) VALUES(?,?,?)`,
        [answers.role, answers.salary, answers.dept]
    );
    //console.log("Added "+answers.dept+" to the database");
    console.log("done");



    startPrompt();
    }