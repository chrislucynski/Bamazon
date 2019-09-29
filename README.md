# Bamazon
This is a mock Amazon app that utilizes table data from MySQL to display info for the user.

### What the project does
This app has 3 main files: a customer view, manager view, and supervisor view, each constomized for each person's role in the 'store'. 

##### Customer View
The Customer view allows the user two options: View Products or Purchase Products. If View Products is chosen, the user can view the products and its information - item ID, product name, department name, price, and stock quantity - in a table that is organized and convenient.

The user may also purchase any product located in the table.  The app will calculate a total based on the unit price of each product and the number of units the user would like to purchase.  That total is then added back into the MySQL database under product_sales, and the stock_quantity updates based on the number of units purchased.

##### Manager View
The Manager view allows the user to View Products, View Items with Low Inventory, Add to Inverntory, and Add New Item.  

In this view, the manager can do a number tasks, all of which are linked to the MySQL database and will update as appropriate.

##### Supervisor View
The Supervisor view has the capability of creating new departments as well as viewing financial data based off of the overhead, purchase history.

### Why the project is useful
This project is useful in showing the various tools available to business owners through MySQL and how this data can be displayed to users via the command terminal.

### How users can get started with the project
Since this is a node.js app, one must utilize the terminal to execute any commands. Instructions for how to use this app can be found below:

Once the user has their terminal open, they must then navigate to the directory with the bamazon files. The user should then execute for the following command: `npm install`.  

Running this line of code will install all node_modules and their dependencies necessary for all of the built-in node packages to work properly.  

After the packages have been installed correctly, the user may open up any of the aforementioned views (customer, manaager, and supervisor) and utilize their various functions.

### Where users can get help with your project
Users can get help with this project by visiting sites that contain information on MySQL, npm and node, or by reading the instructions listed above.

### Who maintains and contributes to the project
I maintain and contribute to this project.