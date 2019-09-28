// Create another Node app called bamazonSupervisor.js. 
// Running this application will list a set of menu options:
    // View Product Sales by Department
    // Create New Department

var inquirer = require('inquirer');
var mysql = require("mysql");

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
                choices: ['View products sales by department', 'Create new department', 'Exit']
            }
        ]).then(function(choicesResponse){
            console.log(choicesResponse)
            switch (choicesResponse.choicesList) {
                case 'View products sales by department':
                    for(var i = 0; i < response.length; i++){
                      console.log(
                          'Item ID#: ' + response[i].item_id + 
                          ', Product Name: ' + response[i].product_name +
                          ', Price: ' + response[i].price +
                          ', Quantity: ' + response[i].stock_quantity
                      )
                    }  
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
                        // console.log(res)
                    }
                )
                console.log(query.sql);
                supervisorChoices()
            })
        })
    }
})




