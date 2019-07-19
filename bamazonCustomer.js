const inquire = require('inquirer');
const mysql = require('mysql');
const table = require('table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'pword',
  database: 'bamazon'
});
