const express = require('express');
const userExpressRouter = express.Router();

const permissions = require("../scripts/authentication/userPermissions");
const navbar = require('../scripts/menu bar/navBarSetup');

userExpressRouter.get('/studentdashboard', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, (req, res) => { //Load the student dashboard
    var userDash = '/user/studentdashboard';
    res.render('./Student_Pages/studentDashboard', {userDash});
});

userExpressRouter.get('/teacherdashboard', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, (req, res) => { //Load the teacher dashboard
    var userDash = '/user/teacherdashboard';
    res.render('./Teacher_Pages/teacherDashboard', {userDash});
});

userExpressRouter.get('/admindashboard', permissions.isUserAlreadyLogedIn, permissions.isUserAdmin, (req, res) => { //Load the admin dashboard
    var userDash = '/user/adminDashboard';
    res.render('./Admin_Pages/adminDashboard', {userDash});
});

userExpressRouter.get('/settingspage', permissions.isUserAlreadyLogedIn, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    if(userDash.localeCompare('/user/studentdashboard') == 0 ){ //user is a student so load the student version of the settings page
        res.render('./Settings_Page/account_Settings_Student', {userDash}); //A user that is logged in is attempting to load this page
    }else if(userDash.localeCompare('/user/teacherdashboard') == 0){ //user is a teacher so load the teacher version of the settings page
        res.render('./Settings_Page/account_Settings', {userDash}); //A user that is logged in is attempting to load this page
    }else if(userDash.localeCompare('/user/adminDashboard') == 0){ //user is an admin so load the admin version of the settings page
        res.render('./Settings_Page/account_Settings', {userDash}); //A user that is logged in is attempting to load this page
    }else{ //User is not logged in
        res.redirect('/'); //A user that is not logged in is attempting to load this page
    }
});

userExpressRouter.post('/updateAccountInfo', permissions.isUserAlreadyLogedIn, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    res.send("Do a thing");
});

userExpressRouter.post('/updateUserPassword', permissions.isUserAlreadyLogedIn, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    res.send("Do another thing");
});

userExpressRouter.get('/logout', permissions.isUserAlreadyLogedIn, (req, res) => {
    req.session.destroy(); //Log the user out by destorying their session
    res.redirect('/');
});

module.exports = userExpressRouter;