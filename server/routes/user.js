const express = require('express');
const userExpressRouter = express.Router();

const permissions = require("../scripts/authentication/userPermissions");
const navbar = require('../scripts/menu bar/navBarSetup');
const labs = require('../scripts/question generation/labGeneration');

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

userExpressRouter.get('/settingspage', permissions.isUserAlreadyLogedIn, (req, res) => {
    var userDash = null;
    try{
        userDash = navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    if(userDash){
        res.render('./Settings_Page/account_Settings', {userDash}); //A user that is logged in is attempting to load this page
    }
    else{
        res.render('./Settings_Page/account_Settings'); //A user that is not logged in is attempting to load this page
    }
});

userExpressRouter.get('/logout', permissions.isUserAlreadyLogedIn, (req, res) => {
    req.session.destroy(); //Log the user out by destorying their session
    res.redirect('/');
});

userExpressRouter.get('/lab1', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, (req, res) => {
    var userDash = null;
    try{
        userDash = navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    var showQuestions = labs.generateStudentLab(2);
    if(userDash){
        res.render('./Lab_Pages/studentLab', {userDash, showQuestions});
    }
    else{
        res.render('./Lab_Pages/studentLab');
    }
});


userExpressRouter.get('/lab1_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    labs.generateTeacherLab("1"); //Generate lab
    
    if(userDash){
        res.render('./Lab_Pages/keyLab', {userDash});
    }
    else{
        res.render('./Lab_Pages/keyLab');
    }
});

module.exports = userExpressRouter;