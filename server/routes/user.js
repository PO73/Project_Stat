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
    if(userDash){
        res.render('./Settings_Page/account_Settings', {userDash}); //A user that is logged in is attempting to load this page
    }
    else{
        res.redirect('/'); //A user that is not logged in is attempting to load this page
    }
});

userExpressRouter.get('/logout', permissions.isUserAlreadyLogedIn, (req, res) => {
    req.session.destroy(); //Log the user out by destorying their session
    res.redirect('/');
});

module.exports = userExpressRouter;