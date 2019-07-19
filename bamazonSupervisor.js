const inquire = require('inquirer');
const mysql = require('mysql');
const Table = require('easy-table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'pword',
  database: 'bamazon'
});

var productList = [];
var products;
var departments;

connection.connect(function(err) {
  if (err) throw err;
  updateVars();
  startQ();
});

function updateVars() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    for (x in res) {
      productList.push(res[x].product_name);
    }
    products = res;
  });
  connection.query('SELECT * FROM departments', function(err, r) {
    if (err) throw err;
    departments = r;
  });
}

function startQ() {
  inquire
    .prompt([
      {
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View product sales by department',
          'Create new department',
          'Quit'
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.choice) {
        case 'View product sales by department':
          viewDepartmentSales();
          break;
        case 'Create new department':
          newDepartment();
          break;
        case 'Quit':
          console.log('Bye bye!');
          connection.end();
          break;
        default:
          break;
      }
    });
}

function viewDepartmentSales() {
  console.log('View department sales');
  startQ();
}

function newDepartment() {
  console.log('Create a new department here!');
  startQ();
}
/*
Modify mySQL and bamazonCustomer first.

Add a new table with department_id, department_name, and overhead_costs columns

2 options

1. View product sales by department 
-- display department table + add a total profit column (product sales - overhead cost)

2. Create new department
-- inquire to fill in fields

*/
