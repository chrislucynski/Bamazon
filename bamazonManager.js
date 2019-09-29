var inquirer = require('inquirer');
var mysql = require("mysql");
var Table = require('cli-table')

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "chris",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

connection.query(`SELECT * FROM products;`, function(error, res){
    if (error) throw error;
    managerChoices()

    function managerChoices(){
      inquirer.prompt([
        {
          type: 'list',
          name: 'choicesList',
          message: 'What would you like to do?',
          choices: ['View products', 'View Items with Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }
      ]).then(function(choiceAnswers, err){
          switch (choiceAnswers.choicesList) {
            case 'View products':
              for(var i = 0; i < res.length; i++){
                var table = new Table({
                    head: 
                    [
                        'Item ID:', 
                        'Product Name:', 
                        'Department Name:', 
                        'Price:', 
                        'Stock Quantity:',
                    ]
                    , colWidths: [13, 26, 18, 10, 17]
                });
            
                table.push(
                    [
                        res[i].item_id,
                        res[i].product_name,
                        res[i].department_name,
                        '$' + res[i].price,
                        res[i].stock_quantity
                    ]
                );
                console.log(table.toString());
            }
                managerChoices()
                break;
            case 'View Items with Low Inventory':
                for(var i = 0; i < res.length; i++){
                    if(res[i].stock_quantity < 5){
                        console.log('Product Name: ' + res[i].product_name + ', Quantity: ' + res[i].stock_quantity)
                    }
                }
                managerChoices()
                break;
            case 'Add to Inventory':
                console.log('Which product would you like to add more of?')
                addInventory();
                break;
            case 'Add New Product':
                addNewProduct()
                break;
            case 'Exit':
                connection.end();
                break;
            default:
                console.log('Something happened that was not supposed to.')
                break;
          }
          if (err) throw err;
        })
    }
    function addNewProduct(){
      console.log("Fill in the fields below to add product.");
      inquirer.prompt([
        {
          type: 'input',
          name: 'productName',
          message: 'What is the name of the product?'
        },
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the department? Note: department name must be Medications or Medical Supplies.'
        },
        {
          type: 'number',
          name: 'price',
          message: 'What is the price of the product?'
        },
        {
          type: 'number',
          name: 'stockQuantity',
          message: 'What is the total quantity you would like to add?'
        },
      ]).then(function(newProductAnswers, err){
        console.log(newProductAnswers.price)
        var query = connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: newProductAnswers.productName,
            department_name: newProductAnswers.departmentName,
            price: newProductAnswers.price,
            stock_quantity: newProductAnswers.stockQuantity
          },
          function(err, res) {
            if (err) throw err;
          }
        );
        console.log(query.sql);
        if(err) throw err;
        managerChoices()
      })
    }
    function addInventory(){
      inquirer.prompt([
          {
              type: 'number',
              name: 'itemID',
              message: 'Type desired item ID#.'
          },
          {
              type: 'number',
              name: 'stockAmount',
              message: 'Type amount you would like to add.'
          }
      ]).then(function(answers, err){
          if (err) throw err;
          var query = connection.query(
              "UPDATE products SET ? WHERE ?",
              [
              {
                  stock_quantity: res[answers.itemID-1].stock_quantity + answers.stockAmount
              },
              {
                  item_id: answers.itemID
              }
              ],
              function(err, res) {
              if (err) throw err;
              }
          );
          console.log('Stock quantity updated for that item ID.');
          console.log(query.sql);
          managerChoices()
      })
    }
})

