const unlockReward = require('../scripts/unlockAchievement');
const Lab = require('../models/Lab').myLab;
const User = require('../models/User').myUser;
const Quiz = require('../models/Quiz').myQuiz;

//See what user is currently using this session ID
function getUserID(sessionRequest){
    return new Promise((resolve, reject) => {
        User.findAll({where: { SessionID: sessionRequest }})
        .then(activeUser => {
            resolve(activeUser[0].dataValues.ID); //Session ID are unquie so there should be no conflicts 
        })
        .catch(error => { //Error occured during the query
            reject('');
        });
    });
}

function getLabPassingValue(labID){
    return new Promise((resolve, reject) => {
        Lab.findAll({where: { ID: labID}}) //Pull the min grade for a pas
        .then(thisLab => { //Questions answers found
            var grade = thisLab[0].dataValues.Passinggrade;
            resolve(grade);
        })
        .catch(error => { //Questions answers not found
            reject(-1);
        })
    });
}

function getQuizPassingValue(quizID){
    return new Promise((resolve, reject) => {
        Quiz.findAll({where: { ID: quizID}}) //Pull the min grade for a pas
        .then(thisQuiz => { //Questions answers found
            var grade = thisQuiz[0].dataValues.passing_grade;
            resolve(grade);
        })
        .catch(error => { //Questions answers not found
            reject(-1);
        })
    });
}

async function shouldUnlockRewardLab(numOfCorrect, labNumber, achievementName, userSessionID){
    var gradeFeedback = [];
    var passingGrade = -1;
    var userID = -1;

    try {
        userID = await getUserID(userSessionID);
    } catch (error) {
        return gradeFeedback = ([false, 0, 0]); //Replace with a custom error page
    }

    try {
        passingGrade = await getLabPassingValue(labNumber);
    } catch (error) {
        passingGrade = 0; //Replace with a custom error page
    }
    
    if(numOfCorrect < passingGrade){ //User failed to pass the lab
        gradeFeedback = ([false, numOfCorrect, passingGrade]);
    }else{ //User passed the lab
        unlockReward.unlockAchievement(userID, achievementName);
        gradeFeedback = ([true, numOfCorrect, passingGrade ]);
    }
    return gradeFeedback;
};

async function shouldUnlockRewardQuiz(numOfCorrect, quizNumber, achievementName, userSessionID){
    var gradeFeedback = [];
    var passingGrade = -1;
    var userID = -1;

    try {
        userID = await getUserID(userSessionID);
    } catch (error) {
        return gradeFeedback = ([false, 0, 0]); //Replace with a custom error page
    }

    try {
        passingGrade = await getQuizPassingValue(quizNumber);
    } catch (error) {
        passingGrade = 0; //Replace with a custom error page
    }
    
    if(numOfCorrect < passingGrade){ //User failed to pass the lab
        gradeFeedback = ([false, numOfCorrect, passingGrade]);
    }else{ //User passed the lab
        unlockReward.unlockAchievement(userID, achievementName);
        gradeFeedback = ([true, numOfCorrect, passingGrade ]);
    }
    return gradeFeedback;
}

module.exports = {
    shouldUnlockRewardLab,
    shouldUnlockRewardQuiz
};