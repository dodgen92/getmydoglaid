//Dependencies
var express = require("express");
var path = require("path");

//Create express server
var app = express();

//Define the port
var PORT = process.env.PORT || 3000;

//Setup for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Router
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Listner
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });