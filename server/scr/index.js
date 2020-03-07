const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config(); //Setup environment variables

const middlewares = require('./middlewares')
const sendEmail = require('./sendEmail');
const testForm = require('./testForms/testForm');
const gradeTestForm = require('./testForms/gradeTestForm');
const registerStudent = require('./userAccount/register');

const app = express();

app.use(express.json()); //Allows for easy parsing of JSON object sent from the client 
app.use(morgan('common')); //Logs requires
app.use(helmet()); //Hides headers that could cause security concerns
app.set('view engine', 'ejs'); //Using ejs as our templating engine for dynamic webpages
app.use(express.static('public'));

//Needs to be change on deployment using .env file
app.use(cors()); //Controls who/where request to our backend can come from

const port = process.env.PORT || 3000; //Use port 3000 or port defined in the .env file
app.listen(port, () =>{
    console.log('Listening at ' + port);
});

app.get('/', (req, res) => {
    res.sendFile("index.html");
});

app.post('/contactPageRequest', (req, res) => {
    console.log(req.body)
    //Send Email and see if it succeeded

    res.json({
        status: "Server still needs to tell me my own status"
    });
});

app.post('/registerStudent', registerStudent.checkStudentAccount);

app.get('/loginPage', (req, res) => {
    console.log(req.body)
});

app.get('/customHTML', testForm.generateLab);

app.post('/gradeTestForm', gradeTestForm.gradeQuestions);

app.post('/sendEmail', sendEmail.email);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

