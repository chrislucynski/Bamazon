var inquirer = require('inquirer');
var mysql = require("mysql");
var userInput;

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
    console.log(res)
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
            var unitPrice;
            var purchaseQuery = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: remainingUnits - unitsRequested
                  },
                  {
                    item_id: customerItemId
                  }
                ],
                function(err, res) {
                  if (err) throw err;
                }
              );
                var unitPrice = res[customerItemId -1].price;
                var totalPrice = unitPrice * unitsRequested
                console.log('The price of the ' + customerProductName + ' you would like is ' + unitPrice + '.')
                console.log('Your total comes out to: $' + totalPrice);
            // 
              console.log(purchaseQuery.sql);

        } else {
          console.log('Insufficient quantity!')
        }
    })
})




// template for INNER JOIN query
// <----------------------->
// connection.query(`SELECT A.a FROM A INNER JOIN B ON A.a = B.a AND A.b = B.b;`, function(error, res){
//     if (error) throw error;
//     console.log(res)
// })

// function updateProduct() {
//     console.log("Updating product quantity...\n");
//     var query = connection.query(
//       "UPDATE products SET ? WHERE ?",
//       [
//         {
//           stock_quantity: actualUnits - unitsRequested
//         },
//         {
//           item_id: customerItemId
//         }
//       ],
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " products updated!\n");
//       }
//     );
//     console.log(query.sql);
//   }





