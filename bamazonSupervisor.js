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

/*
Modify mySQL and bamazonCustomer first.

Add a new table with department_id, department_name, and overhead_costs columns

2 options

1. View product sales by department 
-- display department table + add a total profit column (product sales - overhead cost)

2. Create new department
-- inquire to fill in fields

*/
