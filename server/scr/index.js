const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { v4: uuidv4 } = require('uuid');

require('dotenv').config(); //Setup environment variables

const middlewares = require('./middlewares')
const sendEmail = require('./sendEmail');
const testForm = require('./testForms/testForm');
const gradeTestForm = require('./testForms/gradeTestForm');
const registerStudent = require('./userAccount/register');
const login = require('./userAccount/login');

const app = express();

app.use(express.json()); //Allows for easy parsing of JSON object sent from the client 
app.use(morgan('common')); //Logs requires
app.use(helmet()); //Hides headers that could cause security concerns
app.set('view engine', 'ejs'); //Using ejs as our templating engine for dynamic webpages
app.use(express.static('public'));

//DB permissions
const dbOptions = {
    connectionLimit : 50,
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: '3306',
    database: 'mydb',
};

//MYSQL session tracker/store
const sessionStore = new MySQLStore(dbOptions);

//Session
app.use(session({
    key: 'session_cookie_name',
    store: sessionStore,
    secret: 'thisbesecret', //Replace this with a random string in .env when deploying
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true } //Need a HTTPS connection when Deployed
}));

//Needs to be change on deployment using .env file
app.use(cors()); //Controls who/where request to our backend can come from

const port = process.env.PORT || 3000; //Use port 3000 or port defined in the .env file
app.listen(port, () =>{
    console.log('Listening at ' + port);
});

app.get('/', (req, res) => {
    res.sendFile("index.html");
});

app.get('/studentDashboard', (req, res) => {
    res.render("studentDashBoard", {});
});

app.get('/lab1', testForm.generateLab);

app.post('/contactPageRequest', (req, res) => {
    console.log(req.body)
    //Send Email and see if it succeeded

    res.json({
        status: "Contact Page Currently Disabled..."
    });
});

app.post('/registerStudent', registerStudent.checkStudentAccount);

app.post('/loginPage', login.loginUser);

app.get('/customHTML', testForm.generateLab);

app.post('/gradeTestForm', gradeTestForm.gradeQuestions);

app.post('/sendEmail', sendEmail.email);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

