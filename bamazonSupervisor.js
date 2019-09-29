// Create another Node app called bamazonSupervisor.js. 
// Running this application will list a set of menu options:
    // View Product Sales by Department
    // Create New Department

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

connection.query(`SELECT * FROM products;`, function(error, response){
    // console.log(response) 
    supervisorChoices();
    if (error) throw error;
    
    function supervisorChoices(){
        inquirer.prompt([
            {
                type: 'list',
                name: 'choicesList',
                message: 'What would you like to do?',
                choices: [
                    'View products sales by department', 
                    'Create new department', 
                    'Exit'
                ]
            }
        ]).then(function(choicesResponse){
            console.log(choicesResponse)
            switch (choicesResponse.choicesList) {
                case 'View products sales by department':
                    viewProductSales();
                    // for(var i = 0; i < response.length; i++){
                    //   console.log(
                    //       'Item ID#: ' + response[i].item_id + 
                    //       ', Product Name: ' + response[i].product_name +
                    //       ', Price: ' + response[i].price +
                    //       ', Quantity: ' + response[i].stock_quantity
                    //   )
                    // }  
                    supervisorChoices()
                    break;
                case 'Create new department':
                    createNewDepartment()
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
    function createNewDepartment(){
       connection.query("Select * FROM departments", function(err, data){
           console.log(data)
            if (err) throw err;
            console.log('Create a new Department')
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newDepartmentName',
                    message: "What is the name of the new department?"
                },
                {
                    type: 'input',
                    name: 'newDepartmentOverhead',
                    message: "What is the total cost of overhead of the new department?"
                }
            ]).then(function(promptResponses){
                console.log(promptResponses)
                var query = connection.query(
                    "INSERT INTO departments SET ?",
                    {
                        department_name: promptResponses.newDepartmentName,
                        over_head_costs: promptResponses.newDepartmentOverhead
                    },
                    function(err, res) {
                        if (err) throw err;
                    }
                )
                console.log(query.sql);
                supervisorChoices()
            })
        })
    }
    function viewProductSales(){
        connection.query(
            // `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
            `SELECT  
            departments.department_id,
            departments.department_name, 
            departments.over_head_costs,
            products.product_sales
            FROM departments 
            INNER JOIN products 
            ON departments.department_name = products.department_name
            GROUP BY departments.department_id, departments.department_name, 
            departments.over_head_costs, products.product_sales
            ORDER BY departments.department_id;`, function(err, data){
                if(err) throw err;
                console.log(data)
        })
    }

    // var table = new Table({
    //     head: ['TH 1 label', 'TH 2 label']
    //     , colWidths: [100, 200]
    //     });

    //     table.push(
    //     ['First value', 'Second value']
    //     , ['First value', 'Second value']
    //     );

    //     console.log(table.toString());
})




