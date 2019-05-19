// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to bAmazon! You are now connected to the bAmazon Store as id " + connection.threadId);
    console.log('------------------------------------------------------------------------')

});

var inventory = function () {
    console.log("ID |  Product Name |  Department Name |  Price  | Stock Quantity")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].dapartment_name + " | $" + res[i].price + " | " + res[i].stock_quantity)

        }
        // console.log(res)
        purchase();
    });
    // connection.end();
};

function purchase() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "What is the Item ID of the product you would like to buy?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many do you need?"
        }
    ]).then(function (answer) {
        var item = answer.item_id;
        var quantityNeeded = answer.quantity;

        connection.query("SELECT * FROM products WHERE ?", [answer.item_id], function (err, res) {
            if (err) throw err;
            if (res[0].stock_quantity - quantityNeeded >= 0) {
                var totalCost = res[0].price * quantityNeeded;
                console.log("Great news! We got it!")
                console.log(quantityNeeded + " " + res[0].product_name + " will cost " + totalCost);
                var newQuantity = res[0].stock_quantity - quantityNeeded
                connection.query("UPDATE products SET stock_quantity WHERE ?", [{
                    stock_quantity: newQuantity
                }]);
            } else {
                console.log("Insufficient quantity")
            };
            inventory();
        });
    });
};

inventory();