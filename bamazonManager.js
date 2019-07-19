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

function updateVars() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    for (x in res) {
      itemList.push(res[x].product_name);
    }
    items = res;
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
          newProduct();
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
              updateVars();
              startQ();
            }
          }
        });
    });
}

function newProduct() {
  inquire
    .prompt([
      {
        name: 'product',
        type: 'input',
        message: "What's the name of the new product?"
      },
      {
        name: 'category',
        type: 'input',
        message: "Specify the new product's category."
      },
      {
        name: 'price',
        type: 'input',
        message: 'Name your price.'
      },
      {
        name: 'stock',
        type: 'input',
        message: 'How much inventory?'
      }
    ])
    .then(function(answers) {
      connection.query(
        'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)',
        [
          answers.product,
          answers.category,
          parseFloat(answers.price),
          parseInt(answers.stock)
        ],
        function(err) {
          if (err) throw err;
          console.log(
            'Successfully added ' +
              answers.product +
              ' (' +
              answers.stock +
              ' in stock) for $' +
              answers.price +
              ' in the ' +
              answers.category +
              ' category.'
          );
        }
      );
      updateVars();
      setTimeout(startQ, 300);
    });
}
