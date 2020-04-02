const bcrypt = require('bcryptjs');
const User = require('../models/User').myUser;
const registerHelper = require('./register user/registerHelper');

//Basic input check to see if user has completed the form correctly
requiredInputCheck = (emailaddress, pswd) =>{
    var sc = new RegExp(/[!#$%^&*\\/(),?":\'{}\s=`~+|<>]/);
    var errorMessages = [];

    if (emailaddress == '' || pswd == '') { //User did not fill out all the required fields
        errorMessages.push({ msg: "Please fill out all required fields" });
    }
    else{
        if(sc.test(String(emailaddress)) || sc.test(String(pswd))) { //Special characters are not allowed
            errorMessages.push({ msg: "No special characters are allowed" });
        }
    }
    return errorMessages;
}

//Check to see if the email and password exist in the DB
function loginThisUser(emailaddress, password) {
    return new Promise((resolve, reject) => {
        User.findAll({where: { Email: emailaddress }})
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
            reject(true);
        })
    });
}

//Check to see if the user is an admin, teacher, or student
function getUserType(sessionRequest){
    return new Promise((resolve, reject) => {
        User.findAll({where: { SessionID: sessionRequest }})
        .then(activeUser => {
            resolve(activeUser[0].dataValues.Usertype); //Session ID are unquie so there should be no conflicts 
        })
        .catch(error => { //Error occured during the query
            reject('');
        });
    });
}

async function userLogin (req, res) { 
    let { emailadd, pass } = req.body;

    var errorMessages = []; //Holds all the error messages found during validation check of users information
    
    errorMessages = requiredInputCheck(emailadd, pass);
   
    if(errorMessages.length > 0){ //An error has occurred in validating the user registration process
        res.render('./Login_Page/login', {errorMessages, emailadd});
    }
    else {
        try{
            var x = await loginThisUser(emailadd, pass);
            if(x){ //User is logged in
                //create session
                req.session.active = "true"; //This ensure the session id does not changes upon new request, and stores in DB (idk with this middleware) 
                //req.session.save(); //Stores the session id in DB but does not keep the session id on next request
                var userSessionID = req.sessionID;
                try {
                    var z = await registerHelper.storeSessionID(emailadd, userSessionID);
                    try {
                        var x = await getUserType(userSessionID);
                        if(x.localeCompare('student') == 0){
                            res.redirect('/user/studentdashboard'); //Load the student dashboard
                        }
                        else if(x.localeCompare('teacher') == 0){
                            res.redirect('/user/teacherdashboard'); //Load the teacher  dashboard
                        }
                        else if(x.localeCompare('admin') == 0){
                            res.redirect('/user/admindashboard'); //Load the admin  dashboard
                        }
                        else{
                            console.log("Unknown user type")
                        }
                    } catch (error) {
                        console.log("Log In Error"); //Replace this will a custom error page for our website
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            else{
                errorMessages.push({msg: "Either the password or email are incorrect"});
                res.render('./Login_Page/login', {errorMessages, emailadd});
            }
        } catch(error){
            errorMessages.push({msg: "Failed to log in user..."});
            res.render('./Login_Page/login', {errorMessages, emailadd});
        }
    }
}

module.exports = {
    userLogin,
};