//Required routes 
//const createError = require('http-errors');
//const express = require('express');
//const path = require('path');
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');

//const app = express();

//View engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

//Import the instance of sequelize
const { sequelize } = require('./models');

//Asynchronously connect to the database
sequelize.authenticate()
    .then( () => {
        console.log('Connection to the database successful');
        return sequelize.sync();
    })
    .then( () => {
        console.log('Synchronizing successful')
    })
    .catch( (error) => {
        console.log('Error connecting to the database: ', error);
    })
