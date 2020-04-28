const express = require('express');
const labRouter = express.Router();

const permissions = require("../scripts/authentication/userPermissions");
const navbar = require('../scripts/menu bar/navBarSetup');
const labs = require('../scripts/question generation/labGeneration');
const gradeTest = require('../scripts/question generation/gradeTestForm');
const checkAchievment = require('../scripts/checkForUnlockReward');

labRouter.get('/lab1', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    var displayArray = await labs.generateStudentLab(1);
    
    if(userDash){
        res.render('./Lab_Pages/lab1', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.redirect('/');
    }
});

labRouter.post('/gradelab1', async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    var displayArray = await labs.displaySubmittedLab(1);
    var results = await gradeTest.gradeLabQuestions(1, req.body);

    if(results == null){
        res.redirect('/user/lab/lab1'); //User did not answer any of the questions so redirecte them to the lab page
    }

    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardLab(correct, 1, "Labone", req.sessionID);
    
    if(userDash && feedback){
        res.render('./Lab_Pages/lab1',{userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4], questionFeedback: feedback, Reward: feedback[5], Reward: reward});
    }
    else{
        res.redirect('/user/studentdashboard');
    }
});

labRouter.get('/lab1_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    displayArray = labs.generateTeacherLab(1); //Generate lab
    
    if(userDash){
        res.render('./Lab_Pages/keyLab', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.render('./Lab_Pages/keyLab');
    }
});


labRouter.get('/lab2', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    var displayArray = await labs.generateStudentLab(2);
    
    if(userDash){
        res.render('./Lab_Pages/lab2', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.redirect('/');
    }
});

labRouter.post('/gradelab2', async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    var displayArray = await labs.displaySubmittedLab(2);
    var results = await gradeTest.gradeLabQuestions(2, req.body);

    if(results == null){
        res.redirect('/user/lab/lab2'); //User did not answer any of the questions so redirecte them to the lab page
    }

    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardLab(correct, 2, "Labtwo", req.sessionID);

    if(userDash && feedback){
        res.render('./Lab_Pages/lab2',{userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4], questionFeedback: feedback, Reward: reward});
    }
    else{
        res.redirect('/user/studentdashboard');
    }
});

labRouter.get('/lab2_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    displayArray = labs.generateTeacherLab(2); //Generate lab
    
    if(userDash){
        res.render('./Lab_Pages/keyLab', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.render('./Lab_Pages/keyLab');
    }
});


labRouter.get('/lab3', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    var displayArray = await labs.generateStudentLab(3);
    
    if(userDash){
        res.render('./Lab_Pages/lab3', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.redirect('/');
    }
});

labRouter.post('/gradelab3', async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    var displayArray = await labs.displaySubmittedLab(3);
    var results = await gradeTest.gradeLabQuestions(3, req.body);

    if(results == null){
        res.redirect('/user/lab/lab3'); //User did not answer any of the questions so redirecte them to the lab page
    }

    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardLab(correct, 3, "Labthree", req.sessionID);
    
    if(userDash && feedback){
        res.render('./Lab_Pages/lab3',{userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4], questionFeedback: feedback, Reward: feedback[5], Reward: reward});
    }
    else{
        res.redirect('/user/studentdashboard');
    }
});

labRouter.get('/lab3_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    displayArray = labs.generateTeacherLab(3); //Generate lab
    
    if(userDash){
        res.render('./Lab_Pages/keyLab', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.render('./Lab_Pages/keyLab');
    }
});


labRouter.get('/lab4', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    var displayArray = await labs.generateStudentLab(4);
    
    if(userDash){
        res.render('./Lab_Pages/lab4', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.redirect('/');
    }
});

labRouter.post('/gradelab4', async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    var displayArray = await labs.displaySubmittedLab(4);
    var results = await gradeTest.gradeLabQuestions(4, req.body);

    if(results == null){
        res.redirect('/user/lab/lab4'); //User did not answer any of the questions so redirecte them to the lab page
    }

    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardLab(correct, 4, "Labfour", req.sessionID);

    if(userDash && feedback){
        res.render('./Lab_Pages/lab4',{userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4], questionFeedback: feedback, Reward: feedback[5], Reward: reward});
    }
    else{
        res.redirect('/user/studentdashboard');
    }
});

labRouter.get('/lab4_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    displayArray = labs.generateTeacherLab(4); //Generate lab
    
    if(userDash){
        res.render('./Lab_Pages/keyLab', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.render('./Lab_Pages/keyLab');
    }
});


labRouter.get('/lab5', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    var displayArray = await labs.generateStudentLab(5);
    
    if(userDash){
        res.render('./Lab_Pages/lab5', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.redirect('/');
    }
});

labRouter.post('/gradelab5', async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    var displayArray = await labs.displaySubmittedLab(5);
    var results = await gradeTest.gradeLabQuestions(5, req.body);

    if(results == null){
        res.redirect('/user/lab/lab5'); //User did not answer any of the questions so redirecte them to the lab page
    }

    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardLab(correct, 5, "Labfive", req.sessionID);

    if(userDash && feedback){
        res.render('./Lab_Pages/lab5',{userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4], questionFeedback: feedback, Reward: feedback[5], Reward: reward});
    }
    else{
        res.redirect('/user/studentdashboard');
    }
});

labRouter.get('/lab5_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    displayArray = labs.generateTeacherLab(5); //Generate lab
    
    if(userDash){
        res.render('./Lab_Pages/keyLab', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.render('./Lab_Pages/keyLab');
    }
});


labRouter.get('/lab6', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    var displayArray = await labs.generateStudentLab(6);
    
    if(userDash){
        res.render('./Lab_Pages/lab6', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.redirect('/');
    }
});

labRouter.post('/gradelab6', async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    var displayArray = await labs.displaySubmittedLab(6);
    var results = await gradeTest.gradeLabQuestions(6, req.body);

    if(results == null){
        res.redirect('/user/lab/lab6'); //User did not answer any of the questions so redirecte them to the lab page
    }

    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardLab(correct, 6, "Labsix", req.sessionID);

    if(userDash && feedback){
        res.render('./Lab_Pages/lab6',{userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4], questionFeedback: feedback, Reward: feedback[5], Reward: reward});
    }
    else{
        res.redirect('/user/studentdashboard');
    }
});

labRouter.get('/lab6_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    displayArray = labs.generateTeacherLab(6); //Generate lab
    
    if(userDash){
        res.render('./Lab_Pages/keyLab', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.render('./Lab_Pages/keyLab');
    }
});


labRouter.get('/lab7', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    var displayArray = await labs.generateStudentLab(7);
    
    if(userDash){
        res.render('./Lab_Pages/lab7', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.redirect('/');
    }
});

labRouter.post('/gradelab7', async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    var displayArray = await labs.displaySubmittedLab(7);
    var results = await gradeTest.gradeLabQuestions(7, req.body);

    if(results == null){
        res.redirect('/user/lab/lab7'); //User did not answer any of the questions so redirecte them to the lab page
    }

    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardLab(correct, 7, "Labseven", req.sessionID);

    if(userDash && feedback){
        res.render('./Lab_Pages/lab7',{userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4], questionFeedback: feedback, Reward: feedback[5], Reward: reward});
    }
    else{
        res.redirect('/user/studentdashboard');
    }
});

labRouter.get('/lab7_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.isUserActive(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    displayArray = labs.generateTeacherLab(7); //Generate lab
    
    if(userDash){
        res.render('./Lab_Pages/keyLab', {userDash, Title: displayArray[0], researchScenario: displayArray[1], Direction: displayArray[2], Image: displayArray[3], showQuestions: displayArray[4] });
    }
    else{
        res.render('./Lab_Pages/keyLab');
    }
});

module.exports = labRouter;