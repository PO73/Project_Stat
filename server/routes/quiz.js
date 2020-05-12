const express = require('express');
const quizRouter = express.Router();

const permissions = require("../scripts/authentication/userPermissions");
const navbar = require('../scripts/menu bar/navBarSetup');
const checkAchievment = require('../scripts/checkForUnlockReward');

const quiz = require('../scripts/question generation/quizGeneration');
const gradeQuiz = require('../scripts/question generation/gradeTestForm');

quizRouter.get('/quiz1', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    const QuizID = 1;
    
    const displayElements = await quiz.generateStudentQuiz(QuizID);
    
    if(userDash){
        res.render('./Quiz_Pages/quiz1', {userDash, Title: displayElements.Title, displayThis: displayElements.Section});
    }
    else{
        res.redirect('/');
    }
});

quizRouter.post('/gradequiz1', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    const QuizID = 1;

    const displayElements = await quiz.displaySubmittedQuiz(QuizID);
    const results = await gradeQuiz.gradeQuizQuestions(QuizID, req.body);

    if(results == null){
        res.redirect('/user/quiz/quiz1'); //User did not answer any of the questions so redirecte them to the quiz page
    }

    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardQuiz(correct, QuizID, "Quizone", req.sessionID);

    if(userDash){
        res.render('./Quiz_Pages/quiz1', {userDash, Title: displayElements.Title, displayThis: displayElements.Section, questionFeedback: feedback, Reward: reward});
    }
    else{
        res.redirect('/');
    }
});

quizRouter.get('/quiz1_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    const QuizID = 1;

    const displayElements = await quiz.generateTeacherQuiz(QuizID);
    console.log(displayElements);

    if(userDash){
        res.render('./Quiz_Pages/keyQuiz', {userDash, Title: displayElements.StudentView.Title, displayThis: displayElements.StudentView.Section, 
            answerKey: displayElements.TeacherQuestions.Section, keyAnswers: displayElements.TeacherQuestionKey});
    }
    else{
        res.redirect('/');
    }
});

quizRouter.get('/quiz2', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }

    const QuizID = 2;
    
    const displayElements = await quiz.generateStudentQuiz(QuizID);
    
    if(userDash){
        res.render('./Quiz_Pages/quiz2', {userDash, Title: displayElements.Title, displayThis: displayElements.Section});
    }
    else{
        res.redirect('/');
    }
});

quizRouter.post('/gradequiz2', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    const QuizID = 2;
    const displayElements = await quiz.displaySubmittedQuiz(QuizID);
    const results = await gradeQuiz.gradeQuizQuestions(QuizID, req.body);

    if(results == null){
        res.redirect('/user/quiz/quiz2'); //User did not answer any of the questions so redirecte them to the quiz page
    }
    
    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardQuiz(correct, QuizID, "Quiztwo", req.sessionID);
    
    if(userDash){
        res.render('./Quiz_Pages/quiz2', {userDash, Title: displayElements.Title, displayThis: displayElements.Section, questionFeedback: feedback, Reward: reward});
    }
    else{
        res.redirect('/');
    }
});

quizRouter.get('/quiz2_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    const QuizID = 2;

    const displayElements = await quiz.generateTeacherQuiz(QuizID);
    console.log(displayElements);

    if(userDash){
        res.render('./Quiz_Pages/keyQuiz', {userDash, Title: displayElements.StudentView.Title, displayThis: displayElements.StudentView.Section, 
            answerKey: displayElements.TeacherQuestions.Section, keyAnswers: displayElements.TeacherQuestionKey});
    }
    else{
        res.redirect('/');
    }
});

quizRouter.get('/quiz3', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    
    const QuizID = 3;
    
    const displayElements = await quiz.generateStudentQuiz(QuizID);

    if(userDash){
        res.render('./Quiz_Pages/quiz3', {userDash, Title: displayElements.Title, displayThis: displayElements.Section});
    }
    else{
        res.redirect('/');
    }
});

quizRouter.post('/gradequiz3', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    const QuizID = 3;
    const displayElements = await quiz.displaySubmittedQuiz(QuizID);
    const results = await gradeQuiz.gradeQuizQuestions(QuizID, req.body);
    
    if(results == null){
        res.redirect('/user/quiz/quiz3'); //User did not answer any of the questions so redirecte them to the quiz page
    }
    
    var feedback = results.feedback;
    var correct = results.correct;
    var reward = await checkAchievment.shouldUnlockRewardQuiz(correct, QuizID, "Quizthree", req.sessionID);
    
    if(userDash){
        res.render('./Quiz_Pages/quiz3', {userDash, Title: displayElements.Title, displayThis: displayElements.Section, questionFeedback: feedback, Reward: reward});
    }
    else{
        res.redirect('/');
    }
});

quizRouter.get('/quiz3_key', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, async (req, res) => {
    var userDash = null;
    try{
        userDash = await navbar.setNavBar(req.sessionID); //Determine which menu bar should be loaded
    }
    catch (error) {
        console.log(error);
    }
    const QuizID = 3;

    const displayElements = await quiz.generateTeacherQuiz(QuizID);
    console.log(displayElements);

    if(userDash){
        res.render('./Quiz_Pages/keyQuiz', {userDash, Title: displayElements.StudentView.Title, displayThis: displayElements.StudentView.Section, 
            answerKey: displayElements.TeacherQuestions.Section, keyAnswers: displayElements.TeacherQuestionKey});
    }
    else{
        res.redirect('/');
    }
});

module.exports = quizRouter;