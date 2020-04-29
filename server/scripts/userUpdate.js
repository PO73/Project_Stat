const bcrypt = require('bcryptjs');
const User = require('../models/User').myUser;
const Student = require('../models/Student').myStudent;
const Teahcer = require('../models/Teacher').myTeacher;

//See what user is currently using this session ID
function getUserID(sessionRequest){
    return new Promise((resolve, reject) => {
        User.findAll({where: { SessionID: sessionRequest }})
        .then(activeUser => {
            var myJson = {};
            myJson.Firstname = activeUser[0].dataValues.Firstname;
            myJson.Lastname = activeUser[0].dataValues.Lastname;
            myJson.Email = activeUser[0].dataValues.Email;
            myJson.ID = activeUser[0].dataValues.ID;
            resolve(myJson);
        })
        .catch(error => { //Error occured during the query
            reject('');
        });
    });
}

function getStudentInfo(userID){
    return new Promise((resolve, reject) => {
        Student.findAll({where: { UserID: userID }})
        .then(activeUser => {
            var myJson = {};
            myJson.dob = activeUser[0].dataValues.DateOfBirth;
            myJson.gender = activeUser[0].dataValues.Gender;
            myJson.state = activeUser[0].dataValues.State;
            resolve(myJson);
        })
        .catch(error => { //Error occured during the query
            reject('');
        });
    });
}

function getTeacherInfo(userID){
    return new Promise((resolve, reject) => {
        Teahcer.findAll({where: { UserID: userID }})
        .then(activeUser => {
            var myJson = {};
            myJson.sn = activeUser[0].dataValues.Schoolname;
            myJson.state = activeUser[0].dataValues.State;
            resolve(myJson);
        })
        .catch(error => { //Error occured during the query
            reject('');
        });
    });
}

function checkPassword(sessionRequest, password) {
    return new Promise((resolve, reject) => {
        User.findAll({where: { SessionID: sessionRequest }})
        .then(user => { 
            if(user.length > 0 ){ //User found by email
                var storedPassword = JSON.stringify(user[0].dataValues.Password); //Convert binary to string
                var hashedPassword = '';
                storedPassword = JSON.parse(storedPassword);
                storedPassword.data.forEach(element => { //Get the user's hashed password from the DB
                    hashedPassword += String.fromCharCode(element);
                });

                var match = bcrypt.compareSync(password, hashedPassword); //Compare hashed password to plan text password provided by the user 
                if(match){ //Passwords matched
                    resolve(true);
                }
                else{ //Passwords did not match
                    resolve(false);
                }                
            }
            else{ //User not found by email
                resolve(false);
            }
        })
        .catch(error => { //New user not created
            reject(false);
        })
    });
}

function saveNewPassword(sessionRequest, newPassword){
    return new Promise((resolve, reject) => {
        User.findAll({where: { SessionID: sessionRequest }})
        .then(async activeUser => {
            activeUser[0].Password = newPassword;
            await activeUser[0].save(); //Update the DB
            resolve(true);
        })
        .catch(error => { //Error occured during the query
            reject(false);
        });
    });
}

function doesEmailAlreadyExist(emailaddress, sessionRequest) {
    return new Promise((resolve, reject) => {
        User.findAll({where: { Email: emailaddress }})
            .then(email => {
            if(email.length > 0 && (email[0].SessionID.localeCompare(sessionRequest) != 0)){ //Email in use
                resolve(true);
            }
            else{ //Email available
                resolve(false);
            }
        })
        .catch(error => { //Error occured during the query
            reject(true);
        });
    });
}

function updateUserInfo(sessionRequest, myJson){
    return new Promise((resolve, reject) => {
        User.findAll({where: { SessionID: sessionRequest }})
        .then(async user => { 
            if('student'.localeCompare(user[0].Usertype) == 0){
                user[0].Firstname = myJson.firstname;
                user[0].Lastname = myJson.lastname;
                user[0].Email = myJson.emailaddress;
                await user[0].save();
                await updateStudent(user[0].ID, myJson);
                resolve(true);
            }else if('teacher'.localeCompare(user[0].Usertype) == 0){
                user[0].Firstname = myJson.firstname;
                user[0].Lastname = myJson.lastname;
                user[0].Email = myJson.emailaddress;
                await user[0].save();
                await updateTeacher(user[0].ID, myJson);
                resolve(true);
            } else{
                user[0].Firstname = myJson.firstname;
                user[0].Lastname = myJson.lastname;
                user[0].Email = myJson.emailaddress;
                await user[0].save();
                resolve(true);
            }
        })
        .catch(error => {
            reject(false);
        })
    });
}

function updateStudent(userID, myJson){
    return new Promise((resolve, reject) => {
        Student.findAll({where: { UserID: userID }})
        .then(async activeUser => {
            activeUser[0].DateOfBirth = myJson.birthdate;
            activeUser[0].Gender = myJson.gender;
            activeUser[0].State = myJson.State;
            await activeUser[0].save();
            resolve(true);
        })
        .catch(error => { //Error occured during the query
            reject(false);
        });
    });
}

function updateTeacher(userID, myJson){
    return new Promise((resolve, reject) => {
        Teahcer.findAll({where: { UserID: userID }})
        .then(async activeUser => {
            activeUser[0].Schoolname = myJson.schoolnam;
            activeUser[0].State = myJson.State;
            await activeUser[0].save();
            resolve(true);
        })
        .catch(error => { //Error occured during the query
            reject(false);
        });
    });
}

function checkPasswordSyntax(newPassword, confirmPassword){
    var sc = new RegExp(/[!#$%^&*\\/(),?":\'{}\s=`~+|<>]/);
    var pr = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/);
    var errorMessages = [];
    if(newPassword == '' || confirmPassword == '' ){
        errorMessages.push("New password and confirm new password boxes must be filled out")
    }
    if(sc.test(String(newPassword)) || sc.test(String(confirmPassword))){ //Special characters are not allowed
        errorMessages.push("No special characters are allowed");
    }
    if(newPassword.localeCompare(confirmPassword) != 0){ //User typed their password incorrectly on the confirm password field
        errorMessages.push("Passwords did not match");
    }
    if (String(newPassword).search(pr) != 0){ //Does the user's password meet our requirments
        errorMessages.push("Password needs to contain at least one number, one uppercase letter, and one lowercase letter");
    }
    if (String(newPassword).length < 8){ //Password needs to be 8 characters lone
        errorMessages.push("Password needs a minimum of eight characters long");
    }
    return errorMessages;
}

function checkInputSyntax(myJson){
    var sc = new RegExp(/[!#$%^&*\\/(),?":\'{}\s=`~+|<>]/);
    var pr = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/);
    
    for (var key in myJson) {
        if (myJson.hasOwnProperty(key)) {
            if(sc.test(String(myJson[key]))){
                return "No special characters are allowed";
            }
        }
    }
    return null;
}

function encryptPassword (pswd) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pswd, salt);
    return hash;
}

async function showStudentInfo(sessionID){
    var userInfo = await getUserID(sessionID);
    var studentInfo = await getStudentInfo(userInfo.ID);
    var returnThis = {};
    returnThis.fn = userInfo.Firstname;
    returnThis.ln = userInfo.Lastname;
    returnThis.email = userInfo.Email;
    returnThis.dob = studentInfo.dob;
    returnThis.gender = studentInfo.gender;
    returnThis.state = studentInfo.state;
    return returnThis;
}

async function showTeacherInfo(sessionID){
    var userInfo = await getUserID(sessionID);
    var teacherInfo = await getTeacherInfo(userInfo.ID);
    var returnThis = {};
    returnThis.fn = userInfo.Firstname;
    returnThis.ln = userInfo.Lastname;
    returnThis.email = userInfo.Email;
    returnThis.state = teacherInfo.state;
    returnThis.sn = teacherInfo.sn;
    return returnThis;
}

async function showAdminInfo(sessionID) {
    var userInfo = await getUserID(sessionID);
    var returnThis = {};
    returnThis.fn = userInfo.Firstname;
    returnThis.ln = userInfo.Lastname;
    returnThis.email = userInfo.Email;
    return returnThis;
}

async function changePassword(sessionID, requestBody){
    var correctPassword = false;
    var feedback = [];
    try {
        correctPassword = await checkPassword(sessionID, requestBody.currenpassword);
    } catch (error) {
        return ["Incorrect password. Try again."];
    }

    if(correctPassword == true){
        feedback = checkPasswordSyntax(requestBody.newpassword, requestBody.reenterpassword);
        if(feedback.length == 0){
            try {
                var newPasswordHere = encryptPassword(requestBody.newpassword);
                var isChanged = await saveNewPassword(sessionID, newPasswordHere)
                if(isChanged){
                    return null;
                }else{
                    return ["Failed to update user password"]
                }
            } catch (error) {
                return ["Failed to update user password"];
            }
        }else{
            return feedback;
        }

    }else{
        return ["Incorrect password. Try again."];
    }
}

async function changeOtherInfo(sessionID, requestBody){
    var results = checkInputSyntax(requestBody);
    if(results == null){
        try {
            var canPass = await checkPassword(sessionID, requestBody.currenpassword);
            if(canPass){
                try {
                    var emailCheck = await doesEmailAlreadyExist(requestBody.emailaddress, sessionID);
                    if(!emailCheck){
                        try {
                            await updateUserInfo(sessionID, requestBody);
                            return null;
                        } catch (error) {
                            return ["Failed to update user information"];
                        }
                    } else{
                        return ["Email already in use. Try a different email"];
                    }
                } catch (error) {
                    return ["Email already in use. Try a different email"];
                }
            }else {
                return ["Password is incorrect"];
            }
        } catch (error) {
            return ["Password is incorrect"];
        }
    }else{
        return [results];
    }
}

module.exports = {
    showStudentInfo,
    showTeacherInfo,
    showAdminInfo,
    changeOtherInfo,
    changePassword
}