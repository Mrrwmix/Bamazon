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

// Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

var itemList = [];
var items;

connection.connect(function(err) {
  if (err) throw err;
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    for (x in res) {
      itemList.push(res[x].product_name);
    }
    items = res;
  });
  connection.query('SELECT product_name, price FROM products', function(
    err,
    res
  ) {
    if (err) throw err;
    console.log(Table.print(res));
    inquire
      .prompt([
        {
          name: 'theChoice',
          type: 'list',
          message: 'Which item would you like to purchase?',
          choices: itemList
        }
      ])
      .then(function(answer) {
        inquire
          .prompt([
            {
              name: 'quantity',
              type: 'input',
              message: 'You chose ' + answer.theChoice + '. Quantity needed?'
            }
          ])
          .then(function(amount) {
            for (y in items) {
              if (items[y].product_name == answer.theChoice) {
                if (items[y].stock_quantity < amount.quantity) {
                  console.log('Insufficient quantity!');
                } else {
                  connection.query(
                    'UPDATE products SET stock_quantity=' +
                      (parseInt(items[y].stock_quantity) -
                        parseInt(amount.quantity)) +
                      ' WHERE product_name=?',
                    [answer.theChoice],
                    function(err) {
                      if (err) throw err;
                    }
                  );
                  connection.query(
                    'UPDATE products SET product_sales=? WHERE product_name=?',
                    [
                      parseFloat(
                        items[y].product_sales +
                          parseFloat(
                            parseFloat(items[y].price) *
                              parseInt(amount.quantity)
                          )
                      ),
                      answer.theChoice
                    ],
                    function(err) {
                      if (err) throw err;
                    }
                  );
                  console.log(
                    'Successfully purchased ' +
                      answer.theChoice +
                      ' (Quantity: ' +
                      amount.quantity +
                      ') for ' +
                      parseFloat(
                        parseFloat(items[y].price) * parseInt(amount.quantity)
                      ).toFixed(2) +
                      '!\nThanks for shopping on Bamazon.'
                  );
                }
              }
            }
            connection.end();
          });
      });
  });
});
