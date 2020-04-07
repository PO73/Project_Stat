const express = require('express');
const helmet = require('helmet');

require('dotenv').config(); //Use environment variables

const app = express();

//Setting up the DB
const sequelize = require('./config/sequelize').myConnection;
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

//General setup
app.use(express.urlencoded({ extended: true })); //Not safe, needs a HTTPS connection (JSON or XML would be better)
app.use(express.json());

//EJS setup
app.set('view engine', 'ejs');

//Simple security setup
app.use(helmet()); //Hides headers that could cause security concerns on the client side

//CSS and JS client side setup
app.use(express.static('public')); //Any file placed in the public folder will be accessible to anyone (No server side code or user information should be stored there)

//Session store setup
const sessionStore = require('./config/mysqlstore').myStore;
app.use(sessionStore);

//Possible Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const port = process.env.PORT || 3000; //Use port 3000 or port defined in the .env file

app.listen(port, () =>{
    console.log(`Listening at ${port}`);
});