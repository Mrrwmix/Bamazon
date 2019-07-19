CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS departments;

CREATE TABLE IF NOT EXISTS products (
	item_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(70) NOT NULL,
    department_name VARCHAR(70) NOT NULL,
    price FLOAT(14,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    product_sales FLOAT(14,2) DEFAULT 0
);


CREATE TABLE IF NOT EXISTS departments (
    department_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(70) NOT NULL,
    overhead_costs FLOAT(14,2)
);




INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Dragon Quest Builders 2", "Gaming", 59.99, 20),
("Super Smash Bros Ultimate", "Gaming", 49.99, 5),
("Nintendo Switch", "Gaming", 299.99, 10),
("Louisiana Hot Sauce", "Condiments", 5.99, 3),
("Mustard", "Condiments", 2.99, 5),
("Ketchup", "Condiments", 2.99, 3),
("Elmo Puzzles", "Toys", 9.99, 10),
("Oscar's Trash Can", "Toys", 49.99, 1),
("Ernie's Rubber Duckie", "Toys", 39.99, 1),
("Lucha Bros T-shirt", "Apparel", 19.99, 30);

INSERT INTO departments (department_name, overhead_costs) VALUES 
("Gaming", 5000),
("Condiments", 2000),
("Apparel", 1000),
("Toys", 2000);

SELECT * FROM products;
SELECT * FROM departments;