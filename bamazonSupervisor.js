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

connection.connect(function(err) {
  if (err) throw err;
  startQ();
});

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
  connection.query(
    'SELECT d.department_id, d.department_name, d.overhead_costs, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales)-d.overhead_costs) AS total_profit FROM departments d INNER JOIN products ON d.department_name=products.department_name GROUP BY department_name',
    function(err, res) {
      if (err) throw err;
      console.log(Table.print(res));
      startQ();
    }
  );
}

function newDepartment() {
  inquire
    .prompt([
      {
        name: 'depo',
        type: 'input',
        message: "What's the name of the new department?"
      },
      {
        name: 'costs',
        type: 'input',
        message: "Specify the new department's overhead costs."
      }
    ])
    .then(function(answers) {
      connection.query(
        'INSERT INTO departments (department_name, overhead_costs) VALUES (?,?)',
        [answers.depo, parseFloat(answers.costs)],
        function(err) {
          if (err) throw err;
          connection.query('SELECT * FROM departments', function(err, r) {
            if (err) throw err;
            console.log(Table.print(r));
          });
          setTimeout(startQ, 300);
        }
      );
    });
}
