// let's use express
const express = require('express');
const app = express();

// parse incoming requests
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //json kullanılmış(?)
app.use(bodyParser.urlencoded({ extended: false }));

// Kurabiye çalışmalarımız için middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// morgen lütfen
const logger = require('morgan');
app.use(logger("dev")); // bu sayede terminalimizde bol bol "HTTPVerb + URL + statusCode" bilgisi alacağız

// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Express in kulağı 3000 de, pür dikkat');
});