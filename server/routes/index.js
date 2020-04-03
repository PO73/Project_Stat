const express = require('express');
const indexExpressRouter = express.Router();

const permissions = require("../scripts/authentication/userPermissions");
const navbar = require('../scripts/menu bar/calculator');
const studentRegister = require('../scripts/register user/studentRegister').studentRegister;
const teacherRegister = require('../scripts/register user/teacherRegister').teacherRegister;
const loginUser = require('../scripts/userLogin');

indexExpressRouter.get('/', permissions.isUserCurrentlyRegistered, (req, res) =>{ //Load the home page
    res.render('./Home_Page/home');
});

indexExpressRouter.get('/aboutus', (req, res) =>{ //Load the about us page
    res.render('./About_Page/aboutus');
});

indexExpressRouter.get('/contactus', async (req, res) =>{ //Load the contact us page
    var userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    if(userDash){
        res.render('./Contact_Page/contactus', {userDash}); //A user that is logged in is attempting to load this page
    }
    else{
        res.render('./Contact_Page/contactus'); //A user that is not logged in is attempting to load this page
    }
});

indexExpressRouter.get('/calculators', async (req, res) =>{ //Load the calculator page
    var userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    if(userDash){
        res.render('./Calculator_Page/calculator', {userDash}); //A user that is logged in is attempting to load this page
    }
    else{
        res.render('./Calculator_Page/calculator'); //A user that is not logged in is attempting to load this page
    }
});

indexExpressRouter.get('/login', permissions.isUserCurrentlyRegistered, (req, res) =>{ //Load the login page
    res.render('./Login_Page/login');
});

indexExpressRouter.post('/userlogin', loginUser.userLogin); //Log in with an existing account

indexExpressRouter.get('/passwordreset', permissions.isUserCurrentlyRegistered, (req, res) =>{ //Load the reset password page
    res.render('./Login_Page/passwordreset');
});

indexExpressRouter.get('/studentregister', permissions.isUserCurrentlyRegistered, (req, res) =>{ //Load the student register page
    res.render('./Register_Pages/student_register');
});

indexExpressRouter.post('/studentregister', studentRegister); //Validate the data on the student registration form before creating a new account


indexExpressRouter.get('/teacherregister', permissions.isUserCurrentlyRegistered, (req, res) =>{ //Load the teacher register page
    res.render('./Register_Pages/teacher_register');
});

indexExpressRouter.post('/teacherregister', teacherRegister); //Validate the data on the teacher registration form before creating a new account

module.exports = indexExpressRouter;