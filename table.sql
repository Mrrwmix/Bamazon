CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products (
	item_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(70) NOT NULL,
    department_name VARCHAR(70) NOT NULL,
    price FLOAT(7) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);

-- Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.




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

SELECT * FROM products;