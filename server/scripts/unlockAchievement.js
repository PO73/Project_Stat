const awards = require('../models/Awards').myAwards;

async function createUserAchievement(userID, tableColumnName){
    return  new  Promise((resolve, reject) => {
        awards.create({ UserID: userID, Unitone: false, Unittwo: false, Unitthree: false, Labone: false, Labtwo: false, Labthree: false, Labfour: false, Labfive: false, Labsix: false, Labseven: false, Quizone: false, Quiztwo: false, Quizthree: false, Unitonemodulesone: false, Unitonemodulestwo: false, Unitonemodulesthree: false, Unitonemodulesfour: false, Unittwomodulesone: false, Unittwomodulestwo: false, Unittwomodulesthree: false, Unittwomodulesfour: false, Unitthreemodulesone: false, Unitthreemodulestwo: false, Unitthreemodulesthree: false, Unitthreemodulesfour: false, Unitthreemodulesfive: false, Unitthreemodulessix: false})
        .then(async userAwards => { //New user's rewards row created
            userAwards[tableColumnName] = true;
            await userAwards.save(); //Update the DB
            resolve(true);
        })
        .catch(error => { //Failed to create new user's rewards row
            reject(false);
        })
    });
}

async function updateAchievementTable(userID, tableColumnName){
    return new Promise((resolve, reject) => {
        awards.findAll({where: { UserID: userID }})
        .then(async userAwards => { //New user's rewards row created
            userAwards[0][tableColumnName] = true;
            await userAwards[0].save(); //Update the DB
            resolve(true);
        })
        .catch(async error => { //User not found
            console.log(error);
            var userAwards = await createUserAchievement(userID, tableColumnName);
            if(userAwards){
                resolve(true);
            } else{
                reject(false);
            }
        })
    });
}

async function unlockAchievement(userID, tableColumnName){
    try {
        await updateAchievementTable(userID, tableColumnName);
        return true; //Show that a user has unlocked an achievement
    } catch (error) {
        return false; //Don't show that the user unlocked an achievement
    }
}

module.exports = {
    unlockAchievement
};