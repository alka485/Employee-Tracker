const inquirer = require('inquirer');
const mysql = require('mysql2');
const utils = require('util');
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username,
        user: 'root',
        //MySQL password
        password: '',
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
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee role',
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
                    break;
                case 'Add Role':
                    addRole();
                   break;
                case 'Add Employee':
                    addEmp();
                    break;
                case 'Update Employee role':
                    updateEmpRole();   
                    break;   
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
   // console.log("Hello");

    const answersDept = await inquirer.prompt([
        {
            message: "What is the name of the department?",
            name: "dept",
            type: "input"
        }
       
    ]);

    await db.query(
        "INSERT INTO department (name) VALUES(?)",  [answersDept.dept] );
    console.log("Added " + answersDept.dept + " to the database");
    startPrompt();
    console.log("END");
}
const addRole = async () => {
    const department = await db.query("SELECT * FROM department");
    const userChoices = department.map(department => ({
        name: department.name,
        value: department.id     
   }) );
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
        [answers.role, answers.sal, answers.dept] );
    console.log("Added "+answers.role+" to the database");
    startPrompt();
    }
    const addEmp = async () => {
         const role = await db.query("SELECT id,title FROM role");
         const userChoices = role.map(role => ({
            name: role.title,
            value: role.id     
       }) );

       const employee = await db.query("SELECT id, first_name,last_name from employee");
       const userManager = employee.map(employee => ({
              name: employee.first_name + " "+employee.last_name,
              value: employee.id
       }));
         const answers = await inquirer.prompt([
            {
                message: "What is the employee first name?",
                name: "f_name",
                type: "input"
            },
            {
                message: "What is the employee last name?",
                name: "l_name",
                type: "input"
            },
            {
                message: "What is the employee role?",
                name: "emp_role",
                type: "list",
                choices: userChoices
            },
            {
                message: "Who is the employee manager?",
                name: "emp_manager",
                type: "list",
                choices: userManager
            }
         ]);
    
        await db.query(
            `INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)`,
            [answers.f_name, answers.l_name, answers.emp_role,answers.emp_manager]
        );
        console.log("Added "+answers.f_name + answers.l_name+" to the database");
        startPrompt();
        }
        const updateEmpRole = async () => {
            const employee = await db.query("SELECT * FROM employee");
            const useremployee = employee.map(employee => ({
                name: employee.first_name + " "+employee.last_name,
                value: employee.id  
           }) );
           const role = await db.query("SELECT id,title FROM role");
            const userRole = role.map(role => ({
            name: role.title,
            value: role.id     
       }) );
     
             const answers = await inquirer.prompt([
                {
                    message: "Which employer role do you want to update?",
                    name: "emp",
                    type: "list",
                    choices: useremployee
                },
                {
                    
                    message: "Which role do you want to assign selected employee?",
                    name: "emp_role",
                    type: "list",
                    choices: userRole
                }                
             ]);
            console.log("update Employee role");
            startPrompt();
            }
    
    