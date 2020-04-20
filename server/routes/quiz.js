const express = require('express');
const quizRouter = express.Router();

const permissions = require("../scripts/authentication/userPermissions");
const navbar = require('../scripts/menu bar/navBarSetup');

quizRouter.get('/quiz1', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    
    if(userDash){
        res.render('./Quiz_Pages/quiz1');
    }
    else{
        res.redirect('/');
    }
});

quizRouter.post('/gradequiz1', async (req, res) => {

});

quizRouter.get('/quiz1_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {

});


quizRouter.get('/quiz2', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    
    if(userDash){
        res.render('./Quiz_Pages/quiz2');
    }
    else{
        res.redirect('/');
    }
});

quizRouter.post('/gradequiz2', async (req, res) => {

});

quizRouter.get('/quiz2_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {

});


quizRouter.get('/quiz3', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    
    if(userDash){
        res.render('./Quiz_Pages/quiz3');
    }
    else{
        res.redirect('/');
    }
});

quizRouter.post('/quiz3', async (req, res) => {

});

quizRouter.get('/quiz3_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {

});

module.exports = quizRouter;