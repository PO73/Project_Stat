const express = require('express');
const userExpressRouter = express.Router();

const permissions = require("../scripts/authentication/userPermissions");
const navbar = require('../scripts/menu bar/navBarSetup');
const settings = require('../scripts/userUpdate');

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

    var info = {};
    if(userDash.localeCompare('/user/studentdashboard') == 0 ){ //user is a student so load the student version of the settings page
        info = await settings.showStudentInfo(req.sessionID);
        res.render('./Settings_Page/account_Settings_Student', {userDash, fname: info.fn, lname: info.ln, email: info.email, gender: info.gender, birth: info.dob, state: info.state});
    }else if(userDash.localeCompare('/user/teacherdashboard') == 0){
        info = await settings.showTeacherInfo(req.sessionID);
        res.render('./Settings_Page/account_Settings_Teacher', {userDash, fname: info.fn, lname: info.ln, email: info.email, schoolnam: info.sn, state: info.state});
    }else if(userDash.localeCompare('/user/adminDashboard') == 0){ 
        info = await setting.showAdminInfo(req.sessionID);
        res.render('./Settings_Page/account_Settings_Admin', {userDash, fname: info.fn, lname: info.ln, email: info.email});
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

    var info = {};
    var feedback = [];
    if(userDash.localeCompare('/user/studentdashboard') == 0 ){ //user is a student so load the student version of the settings page
        feedback = await settings.changeOtherInfo(req.sessionID, req.body);
        info = await settings.showStudentInfo(req.sessionID);
        if(feedback == null){
            res.render('./Settings_Page/account_Settings_Student', {userDash, fname: info.fn, lname: info.ln, email: info.email, gender: info.gender, birth: info.dob, state: info.state, accountSuccess: "update"});
        }else{
            res.render('./Settings_Page/account_Settings_Student', {userDash, fname: info.fn, lname: info.ln, email: info.email, gender: info.gender, birth: info.dob, state: info.state, accountFail: feedback});
        }
    }else if(userDash.localeCompare('/user/teacherdashboard') == 0){
        feedback = await settings.changeOtherInfo(req.sessionID, req.body);
        info = await settings.showTeacherInfo(req.sessionID);
        if(feedback == null){
            res.render('./Settings_Page/account_Settings_Teacher', {userDash, fname: info.fn, lname: info.ln, email: info.email, schoolnam: info.sn, state: info.state, accountSuccess: "update"});
        }else{
            res.render('./Settings_Page/account_Settings_Teacher', {userDash, fname: info.fn, lname: info.ln, email: info.email, schoolnam: info.sn, state: info.state, accountFail: feedback});
        }
    }else if(userDash.localeCompare('/user/adminDashboard') == 0){ 
        feedback = await settings.changeOtherInfo(req.sessionID, req.body);
        info = await setting.showAdminInfo(req.sessionID);
        if(feedback == null){
            res.render('./Settings_Page/account_Settings_Admin', {userDash, fname: info.fn, lname: info.ln, email: info.email, accountSuccess: "update"});
        }else{
            res.render('./Settings_Page/account_Settings_Admin', {userDash, fname: info.fn, lname: info.ln, email: info.email, accountFail: feedback});
        }
    }else{ //User is not logged in
        res.redirect('/'); //A user that is not logged in is attempting to load this page
    }

    console.log(await settings.changeOtherInfo(req.sessionID, req.body));
});

userExpressRouter.post('/updateUserPassword', permissions.isUserAlreadyLogedIn, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    var info = {};
    var feedback = [];
    if(userDash.localeCompare('/user/studentdashboard') == 0 ){ //user is a student so load the student version of the settings page
        info = await settings.showStudentInfo(req.sessionID);
        feedback = await settings.changePassword(req.sessionID, req.body);
        if(feedback == null){
            res.render('./Settings_Page/account_Settings_Student', {userDash, fname: info.fn, lname: info.ln, email: info.email, gender: info.gender, birth: info.dob, state: info.state, passwordSuccess: "update"});
        }else{
            res.render('./Settings_Page/account_Settings_Student', {userDash, fname: info.fn, lname: info.ln, email: info.email, gender: info.gender, birth: info.dob, state: info.state, passwordFail: feedback});
        }
    }else if(userDash.localeCompare('/user/teacherdashboard') == 0){
        info = await settings.showTeacherInfo(req.sessionID);
        feedback = await settings.changePassword(req.sessionID, req.body);
        if(feedback == null){
            res.render('./Settings_Page/account_Settings_Teacher', {userDash, fname: info.fn, lname: info.ln, email: info.email, schoolnam: info.sn, state: info.state, passwordSuccess: "update"});
        }else{
            res.render('./Settings_Page/account_Settings_Teacher', {userDash, fname: info.fn, lname: info.ln, email: info.email, schoolnam: info.sn, state: info.state, passwordFail: feedback});
        }
    }else if(userDash.localeCompare('/user/adminDashboard') == 0){ 
        info = await setting.showAdminInfo(req.sessionID);
        feedback = await settings.changePassword(req.sessionID, req.body);
        if(feedback == null){
            res.render('./Settings_Page/account_Settings_Admin', {userDash, fname: info.fn, lname: info.ln, email: info.email, passwordSuccess: "update"});
        }else{
            res.render('./Settings_Page/account_Settings_Admin', {userDash, fname: info.fn, lname: info.ln, email: info.email, passwordFail: feedback});
        }
    }else{ //User is not logged in
        res.redirect('/'); //A user that is not logged in is attempting to load this page
    }
});

userExpressRouter.get('/logout', permissions.isUserAlreadyLogedIn, (req, res) => {
    req.session.destroy(); //Log the user out by destorying their session
    res.redirect('/');
});

module.exports = userExpressRouter;