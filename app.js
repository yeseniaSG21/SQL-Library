//Required Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

//Import Routes Paths
var indexRouter = require('./routes/index');

//Import Sequelize
const { sequelize } = require('./models');

//Test connection to database and sync the model
sequelize.authenticate()
    .then(() => {
        console.log("Connection to the database successful!")
        return sequelize.sync()
    })
    .then(() => {
        console.log("Model successfully sync with database")
    })
    .catch( error => {
        console.log("Error connecting to the database: ", error)
    })

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Add static middleware
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

//Use Routes Path
app.use('/', indexRouter);

//Catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('page-not-found');
});

//Error handler
app.use((error, req, res, next) => {
    if (error.status === 404) {
        res.status(404).render('page-not-found', { error, title: 'Page Not Found!' });
        console.log('404 Error Occured!');
    } else {
        error.message = error.message || "Uh no! Looks like something went wrong on the server. Return to Homepage.";
        res.status(error.status || 500).render('error', { error, title: 'Server Error!' });
    }
});

module.exports = app;