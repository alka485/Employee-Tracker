//Import and require mysql2
const  inquirer = require('inquirer');
//const choices = require('inquirer/lib/objects/choices');
const mysql = require('mysql2');


const utils = require('util');

//const cTable = require('console.table');

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
            name : 'choice',
            message: "What would you like to do?",
            choices: ['View All departments',
                       'View all roles',
                       'View all employees',
                       'Add a department',
                       'Add a role',
                       'Add an employee',
                       'Update an employee role',
                       'No Action']
                
            
        }
    ]).then ((answers) => {
        console.log(answers);
        //const {choices} = answers;
        console.log(answers.choice);
        
        if(answers.choice === 'View all employees'){
            viewAllEmployees();
        }
    });
    

    // const viewAllEmployees =async () =>{
    //     const emp = await db.query("SELECT id, first_name FROM employees");
    //     console.table(emp);
    //     const empChoices = emp.map(emp => ({
    //         id : emp.id,
    //         first_name : emp.first_name 


    //     }));
    //     console.log(empChoices);
    // }

// const viewDepartment = async () =>{
//     const department = await db.query("Select * From department");
//     console.log();

// }    

// console.log(department);

// viewDepartment();

//db.query= utils.promisify(db.query)

const viewAllEmployees =() => {

    //console.log("hello");


     db.query("SELECT employee.id , employee.first_name,employee.last_name , role.title,role.salary,dpartment.name from employee ,role,department  WHERE department.id = role.department_id AND role.id = employee.role_id   ORDER BY employee.id ASC " ,
                function(err,results){
                    console.log(results);

                }     )
}

// db.query('SELECT * FROM employee',
//           function(err,results,fields){
//             console.log(results);
//             console.log(fields);
//           } )