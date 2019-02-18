var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

//Displays Bamazon inventory data from MySQL to user, then invokes the promptCustomer ID function.
var start = function() {
    //Shows the inserted table values from MySQL workbench in the CLI:
    connection.query("SELECT * FROM products", function(err, res){
        console.log("Welcome to Bamazon!");
        console.log("Below is an Inventory of our products avaliable for sale:");
        console.log("-----------------------------------------------------------");
        console.log("ID  |    Product   |   Department   | Price ($) | Stock ");
        console.log("-----------------------------------------------------------");
        for (var i = 0; i < res.length; i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + "   |   " + res[i].price + "   |   " + res[i].stock_quantity + "\n");
        }
        console.log("-----------------------------------------------------------");
        selectProductId();
    });
}
//Asks the user what Product ID they would like using Inquirer
var selectProductId = function(){
    connection.query("SELECT * FROM products", function(err, res){
        inquirer.prompt({
            name: "productId",
            type: "userInput",
            message: "What is the ID number of the product that you would like to buy (enter a number from 1 to 10)"
        }).then(function(answer){
            if(answer.productId >= 1 && answer.productId <=10){
                //stores the user's answer in variable id number
                var idnumber = answer.productId;
                //Invokes the stockProduct function with stored user value.
                stockProduct(idnumber);
                //Else user does not input a valid value...
            } else {
                //Invalid statement.
                
                console.log("Invalid. Please input a number from 1 up to 10.")
                //Restarts the selectProductId function until customer inputs a valid number.
                selectProductId();
            }
        })
    })
}

//Asks user how many units of the previously specified product they would like to buy.
var stockProduct = function(idnumber) {
    //Setting stored value into index value of stock array
    var stockIndex = idnumber;
    console.log("Selected Item ID: " + stockIndex);
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        inquirer.prompt({
            name: "stock",
            type: "userInput",
            message: "How many units of the product would you like to buy?"
        }).then(function(answer){
            //If number of desired units is less than the quantity of the selected stock quantity...
            if (answer.stock == 0) {
                console.log("Please input a quantity greater than 0. Returning to store front.");
                setTimeout(function(){
                    start();
                }, 2000);
            } 
            else if (answer.stock < res[stockIndex - 1].stock_quantity){
                var updatedStock = res[stockIndex - 1].stock_quantity - answer.stock;
                console.log("You're allowed to buy that many!");

                //Updates stocks for that item in MySQL
                connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: updatedStock},{item_id: stockIndex}]);

                //Then shows the updated stock for that item in the console.
                //As well as the total cost for their purchase.
                console.log("Total Cost of Purchase: " + (res[stockIndex - 1].price) * answer.stock);
                console.log("Cost: " + (res[stockIndex - 1].price) * answer.stock);
            } else {
                console.log("Insufficient quantity!");
            }
        })
    })

};
//Ask user if they would like to make additional purchases or ends the session.
var restartOrder = function() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like make additional purchases: ",
                choices: ["Yes", "No"],
                name: "restartOrder"
            }
    ]).then(function (choices) {
            if (choices.restartOrder === "Yes") {
                console.log(choices.restartOrder);
                restartOrder();
            } else if (choices.restartOrder === "No"){
                return
            }
        })
};
//Begins the application by invoking the start function.
start();
