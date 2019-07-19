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
          viewProducts();
          break;
        case 'View low inventory':
          lowInventory();
          break;
        case 'Add to inventory':
          stockUp();
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
function viewProducts() {
  connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0',
    function(err, res) {
      if (err) throw err;
      console.log(Table.print(res));
      startQ();
    }
  );
}

// View low inventory (stock < 5)
function lowInventory() {
  connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity <= 4 ORDER BY stock_quantity',
    function(err, res) {
      if (err) throw err;
      console.log(Table.print(res));
      startQ();
    }
  );
}

// Add more to an item's stock, UPDATE
function stockUp() {
  updateVars();
  inquire
    .prompt([
      {
        name: 'itemName',
        type: 'list',
        message: 'Which item would you like to add more of?',
        choices: itemList
      }
    ])
    .then(function(response) {
      inquire
        .prompt([
          {
            name: 'amount',
            type: 'input',
            message:
              'How much more ' + response.itemName + ' would you like to add?'
          }
        ])
        .then(function(quantity) {
          for (y in items) {
            if (items[y].product_name == response.itemName) {
              connection.query(
                'UPDATE products SET stock_quantity=' +
                  (parseInt(quantity.amount) +
                    parseInt(items[y].stock_quantity)) +
                  ' WHERE product_name=?',
                [response.itemName],
                function(err) {
                  if (err) throw err;
                }
              );
              console.log(
                response.itemName +
                  ' now has ' +
                  (parseInt(quantity.amount) +
                    parseInt(items[y].stock_quantity)) +
                  ' in stock.'
              );
              startQ();
            }
          }
        });
    });
}

// Use inquirer to INSERT a new product
function newProduct() {}
