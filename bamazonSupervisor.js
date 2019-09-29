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
            `SELECT d.department_id, p.department_name, 
            d.over_head_costs, 
            sum(p.product_sales) as total_product_sales,
            sum(p.product_sales - d.over_head_costs) as total_profit 
            FROM products p, departments d
            WHERE p.department_id = d.department_id
            GROUP BY d.department_id, p.department_name, 
            d.over_head_costs  
            ORDER BY p.department_id;`, 
            function(err, data){
                if(err) throw err;
                console.log(data)
                for(var i = 0; i < data.length; i++){
                    var table = new Table({
                        head: 
                        [
                            'Department ID:', 
                            'Department Name:', 
                            'Overhead Costs:', 
                            'Product Sales:',
                            'Total:'
                        ]
                        , colWidths: [18, 20, 18, 18, 12]
                    });
                
                    table.push(
                        [
                            data[i].department_id,
                            data[i].department_name,
                            '$' + data[i].over_head_costs,
                            '$' + data[i].total_product_sales,
                           '$' + data[i].total_profit
                        ]
                    );
                    console.log(table.toString());
                }
        })
    }

})





