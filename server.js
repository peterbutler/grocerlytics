// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  routes = require('./routes');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/groceries');

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Index Route
app.get('/', routes.index);

// Get Comments
app.get('/items/', routes.getComments);

// Post Comments
app.post('/items/', routes.postItems);


// Start server
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);
