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
  // console.log(res)
  function choices(){
    inquirer.prompt([
      {
        type: 'list',
        name: 'choicesList',
        message: 'What would you like to do?',
        choices: ['View products', 'Purchase products', 'Exit']
      }
    ]).then(function(choiceAnswers, err){
        // console.log(choiceAnswers)
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
            choices();
            break;
            case 'Purchase products':
              purchaseProducts();
            break;
          case 'Exit':
            connection.end();
            break;
          default:
            console.log('Something happened that was not supposed to.')
            break;
        }
      })
  }
  choices();

  function purchaseProducts(){
    inquirer.prompt([
      {
          type: 'input',
          name: 'item_id',
          message: 'What is the item ID of the product you would like to purchase?'
      }, 
      {
          type: 'input',
          name: 'stock_quantity',
          message: 'How many unit would you like to purchase?'
      },
    ]).then(function(answers, err) {
      if (err) throw err;
      var customerItemId = answers.item_id;
      var customerProductName = res[customerItemId-1].product_name
      var unitsRequested = answers.stock_quantity
      var remainingUnits = res[customerItemId-1].stock_quantity
      if(unitsRequested < remainingUnits){
        console.log('Processing your request now. Updating database...')
        var unitPrice = res[customerItemId-1].price;
        var totalPrice = unitPrice * unitsRequested
        var totalSales = res[customerItemId - 1].product_sales + totalPrice
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: remainingUnits - unitsRequested,
              product_sales: totalSales
            },
            {
              item_id: customerItemId
            }
          ],
          function(err, res) {
            if (err) throw err;
          }
        );
          console.log(
            'The price of the ' + 
            customerProductName + 
            ' you would like is $' + 
            unitPrice + '.'
          )
          console.log('Your total comes out to: $' + totalPrice);
      } else {
        console.log('Insufficient quantity!')
      }
      choices();
    })
  }
})


