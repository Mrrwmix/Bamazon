# Bamazon

This is an application which runs through Node to imitate a storefront with products saved to MySQL Server. There are three different ways to interact with the storefront: bamazonCustomer, bamazonManager, and bamazonSupervisor.

## node bamazonCustomer

(Image of initial customer view)[URL]
The initial screen provides a list of products to choose from. Use the arrow keys to navigate and enter to select a product.

### Successful transaction

(Image of successful transaction)[URL]
If the transaction is successful (meaning there is enough of the product in stock), then the console will look like the picture above.

### Insufficient quantity

(Image of insufficient quantity)[URL]
If there isn't enough of a given item in stock, then the application will notify the user as pictured.

## node bamazonManager

(Image of initial manager view)[URL]
Unlike bamazonCustomer, managers see only a menu with 5 options to start with.

### View products for sale

(Image of products for sale)[URL]
This option displays a table with the product's id, name, price, and stock quantity. After selecting any option in bamazonManager, the user will be taken back to the intitial menu.

### View low inventory

(Image of low inventory)[URL]
Like the first option, except the table only displays products with less than 5 in stock.

### Add to Inventory

(Image of add to inventory)[URL]
Add to the inventory of any product. Total inventory displayed after the fields are field in.

### Add new product

(Image of add new product)[URL]
Adds a new product after specifying the name of the product, its category, price, and its stock.

## node bamazonSupervisor

(Image of initial supervisor view)[URL]
Similar to the manager view, but fewer options.

### View product sales by department

(Image of view product sales by department)[URL]
Joins the departments and product tables to show the total amount of sales by department. The "total profits" column is calculated by subtracting the overhead costs from the product sales.

### Create new department

(Image of create new department)[URL]
Creates a new department after answering a couple questions. Displays the new departments table to the user with the newly added department.
