const bcrypt = require('bcryptjs');
const User = require('../../models/User').myUser;

//Basic input check to see if user has completed the form correctly
function requiredInputCheck(firstname, lastname, emailaddress, pswd, confirmpassword, birth, state, input) {
    var sc = new RegExp(/[!#$%^&*\\/(),?":\'{}\s=`~+|<>]/);
    var pr = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/);
    var errorMessages = [];

    if (firstname == '' || lastname == '' || emailaddress == '' || pswd == '' || confirmpassword == ''){ //User did not fill out all the required fields
        errorMessages.push({ msg: "Please fill out all required fields" });
    }
    else{
        if(sc.test(String(firstname)) || sc.test(String(lastname)) || sc.test(String(emailaddress)) || sc.test(String(pswd)) || sc.test(String(confirmpassword)) || (sc.test(String(birth)) && String(birth).localeCompare('') != 0)  || (sc.test(String(state)) && String(state).localeCompare('') != 0) || (sc.test(String(input)) && String(input).localeCompare('') != 0)) { //Special characters are not allowed
            errorMessages.push({ msg: "No special characters are allowed" });
        }
        if(pswd.localeCompare(confirmpassword) == 1){ //User typed their password incorrectly on the confirm password field
            errorMessages.push({ msg: "Passwords did not match" });
        }
        if (String(pswd).search(pr) != 0){ //Does the user's password meet our requirments
            errorMessages.push({ msg: "Password needs to contain at least one number, one uppercase letter, and one lowercase letter" });
        }
        if (String(pswd).length < 8){ //Password needs to be 8 characters lone
        errorMessages.push({ msg: "Password needs a minimum of eight characters long" });
        }
    }

    return errorMessages;
}

//Encrypt the user's password before storing it in the DB
function encryptPassword (pswd) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pswd, salt);
    return hash;
}

//Check to see if the email provided by the user already exist in the DB
function doesEmailAlreadyExist(emailaddress) {
    return new Promise((resolve, reject) => {
        User.findAll({where: { Email: emailaddress }})
            .then(email => {
            if(email.length > 0){ //Email in use
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

//Add new student user to the DB
function createNewUser(firstname, lastname, emailaddress, pswd, usertype){
    return new Promise((resolve, reject) => {
        User.create({ Firstname: firstname, Lastname: lastname, Email: emailaddress, Password: pswd, Usertype: usertype })
        .then(newUser => { //New user created
            resolve(newUser.dataValues.ID);
        })
        .catch(error => { //New user not created
            reject(-1);
        })
    });
}

//Store the users session ID in the user table
function storeSessionID(emailaddress, sessionID){
    return new Promise((resolve, reject) => {
        User.update({SessionID: sessionID}, {where: {Email: emailaddress}})
        .then(update => { //Update successful 
            resolve(true);
        })
        .catch(error => { //Update failed
            reject(false);
        })
    });
}

module.exports = {
    requiredInputCheck,
    encryptPassword,
    doesEmailAlreadyExist,
    createNewUser,
    storeSessionID
}