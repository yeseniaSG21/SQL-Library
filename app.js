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
