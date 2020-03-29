const express = require('express');
const indexExpressRouter = express.Router();

const registerUser = require('../scripts/userRegister');
const loginUser = require('../scripts/userLogin');

indexExpressRouter.get('/', (req, res) =>{ //Load the home page
    res.render('./Home_Page/home');
});

indexExpressRouter.get('/aboutus', (req, res) =>{ //Load the about us page
    res.render('./About_Page/aboutus');
});

indexExpressRouter.get('/contactus', (req, res) =>{ //Load the contact us page
    res.render('./Contact_Page/contactus');
});

indexExpressRouter.get('/calculators', (req, res) =>{ //Load the calculator page
    res.render('./Calculator_Page/calculator');
});

indexExpressRouter.get('/login', (req, res) =>{ //Load the login page
    res.render('./Login_Page/login');
});

indexExpressRouter.post('/userlogin', loginUser.userLogin); //Log in with an existing account

indexExpressRouter.get('/passwordreset', (req, res) =>{ //Load the reset password page
    res.render('./Login_Page/passwordreset');
});

indexExpressRouter.get('/studentregister', (req, res) =>{ //Load the student register page
    res.render('./Register_Pages/student_register');
});

indexExpressRouter.post('/studentregister', registerUser.studentRegister); //Validate the data on the student registration form before creating a new account


indexExpressRouter.get('/teacherregister', (req, res) =>{ //Load the teacher register page
    res.render('./Register_Pages/teacher_register');
});

indexExpressRouter.post('/teacherregister', registerUser.teacherRegister); //Validate the data on the teacher registration form before creating a new account

module.exports = indexExpressRouter;