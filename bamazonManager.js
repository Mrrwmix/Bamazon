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

var itemList = [];
var items;

connection.connect(function(err) {
  if (err) throw err;
  updateVars();
  startQ();
});

// Update itemList array and items variable after any SQL transaction
function updateVars() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    for (x in res) {
      itemList.push(res[x].product_name);
    }
    items = res;
  });
}

// Starting questions to cycle back to upon completing an SQL transaction
function startQ() {
  inquire
    .prompt([
      {
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View products for sale',
          'View low inventory',
          'Add to inventory',
          'Add new product',
          'Quit'
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.choice) {
        case 'View products for sale':
          console.log('See some products');
          break;
        case 'View low inventory':
          console.log('view low');
          break;
        case 'Add to inventory':
          console.log('Add more');
          break;
        case 'Add new product':
          console.log('add new');
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

// View products for sale (stock > 0)
function viewProducts() {}

// View low inventory (stock <= 5)
function lowInventory() {}

// Add more to an item's stock, UPDATE
function stockUp() {}

// Use inquirer to INSERT a new product
function newProduct() {}
