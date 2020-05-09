//node package manager requirements 
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//configure express to port 3000 localhost
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app using bodyparser to view data easily
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// set up static files in express
app.use(express.static(path.join(__dirname, 'app/public')));

//routes
require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});