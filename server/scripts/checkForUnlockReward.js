const unlockReward = require('../scripts/unlockAchievement');
const Lab = require('../models/Lab').myLab;
const User = require('../models/User').myUser;
const Quiz = require('../models/Quiz').myQuiz;
const awards = require('../models/Awards').myAwards;

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
            var grade = thisLab[0].dataValues.passing_grade;
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

async function fetchAllAwards(userID){
    return new Promise((resolve, reject) => {
        awards.findAll({where: { UserID: userID }})
        .then(userAwards => { //User's awards found
            resolve(userAwards);
        })
        .catch(error => { //User's awards not found
            reject(null);
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

async function getAchievements(userSessionID){
    var userID = -1;
    var userAwards = []; 
    var returnThis = [[],[],[]]; //Lab, Quiz, Unit Modules
    try {
        userID = await getUserID(userSessionID);
        userAwards = await fetchAllAwards(userID);

        for(var x in userAwards[0].dataValues){ //This is real bad and needs to be redesigned
            if (userAwards[0].dataValues.hasOwnProperty(x)) {
                if(x.includes('Unit')){
                    returnThis[2].push(userAwards[0].dataValues[x]);
                }

                if(x.includes('Lab')){                   
                    returnThis[0].push(userAwards[0].dataValues[x]);
                }

                if(x.includes("Quiz")){
                    returnThis[1].push(userAwards[0].dataValues[x]);
                }
            }
        }
        return returnThis;
    } catch (error) {
        return [[0,0,0,0,0,0,0],[0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0]]; //Failed to load user awards so show default locked state
    }
}

module.exports = {
    shouldUnlockRewardLab,
    shouldUnlockRewardQuiz,
    getAchievements
};