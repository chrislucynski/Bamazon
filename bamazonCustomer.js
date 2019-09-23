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
})

// function orderQuery(){

// }



// template for INNER JOIN query
// <----------------------->
// connection.query(`SELECT A.a FROM A INNER JOIN B ON A.a = B.a AND A.b = B.b;`, function(error, res){
//     if (error) throw error;
//     console.log(res)
// })


// examples for inquirer.prompts
// <----------------------->
// function queryList() {
//     inquirer.prompt([
//     {
//         type: 'list',
//         name: "query_list",
//         message: "Which would you like to do?",
//         choices: ["Search for songs by artist name.", "Search for artists.", "Select range of dates.", "Search for song."]
//     }, 
//     ]).then(function(answers, err) {
//         if (err) throw err;
//         var optionSelected = answers.query_list;
//         switch (optionSelected) {
//             case 'Search for songs by artist name.':
//                 // console.log('Search for songs by artist name.');
//                 songByArtist();
//                 break;
//             case 'Search for artists.':
//                 // console.log('Search for artists.');
//                 artistSearch();
//                 break;
//             case 'Select range of dates.':
//                 // console.log('Select range of dates.');
//                 dateRange();
//                 break;
//             case 'Search for song.':
//                 // console.log('Search for song.');
//                 songSearch();
//                 break;
//             default:
//                 console.log('Sorry, we do not have anything that matches that.');
//                 break;
//         }
//     })
// };

// function songByArtist(){
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "songsByArtist",
//             message: "Search for songs by artist name."
//         }
//     ]).then(function(answers, err) {
//         if (err) throw err;
//         userInput = answers.songsByArtist;
//         console.log(userInput)
//     })
// };
// function artistSearch(){
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "artists",
//             message: "Search for an artists."
//         }
//     ]).then(function(answers, err) {
//         if (err) throw err;
//         userInput = answers.artists;
//         console.log(userInput)
//     })
// };
// function dateRange(){
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "range",
//             message: "Select a range of dates."
//         }
//     ]).then(function(answers, err) {
//         if (err) throw err;
//         userInput = answers.range;
//         console.log(userInput)
//     })
// };
// function songSearch(){
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "songs",
//             message: "Search for a song."
//         }
//     ]).then(function(answers, err) {
//         if (err) throw err;
//         userInput = answers.songs
//         console.log(userInput)
//     })
// };