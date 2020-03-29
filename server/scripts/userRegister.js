const db =  require('../config/sequelize').myConnection;
const User = require('../models/User').user;
const bcrypt = require('bcryptjs');

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
    User.findall()
        .then(user => {
            console.log(user);
        })
        .catch(err => console.log("HERE"));
}

//Add new student user to the DB
function createStudent(firstname, lastname, emailaddress, pswd, gender, birth, state){
    console.log("Here");
}

const studentRegister = async (req, res) => {
    //Get data entries from the student registration form
    const data = req.body; 
    var firstname = data.fname;
    var lastname = data.lname;
    var emailaddress = data.emailadd;
    var pswd = data.pass;
    var confirmpassword = data.confirmpass;
    var birth = data.bday;
    var state = data.state;
    var gender = data.gender;

    var errorMessages = []; //Holds all the error messages found during validation check of users information

    
    errorMessages = requiredInputCheck(firstname, lastname, emailaddress, pswd, confirmpassword, birth, state, gender);
    
    try{
        var x = await doesEmailAlreadyExist(emailaddress);
        if(x){ //The user's email already exist on our website
            errorMessages.push({ msg: "Email already in use" });
        }
        else{
            pswd = encryptPassword(pswd); //Email is unique so encrypt the user's password
        }
    }
    catch{
        console.log("Database connection error on check vaild email..."); //Replace with a custom error page
    }
    
    if(errorMessages.length > 0){ //An error has occurred in validating the user registration process
        res.render('./Register_Pages/student_register', {errorMessages, firstname, lastname, emailaddress, birth, state, gender});
    }
    else{
        try{
            var x = await createStudent(firstname, lastname, emailaddress, pswd, gender, birth, state);
            if(x){ //The student user was successfully added to the DB
                res.redirect('/user/studentdashboard');
            }
            else{
                errorMessages.push({msg: "Failed to create new student user..."});
                res.render('./Register_Pages/student_register', {errorMessages, firstname, lastname, emailaddress, birth, state, gender});
            }
        }
        catch{
            console.log("Database connection error on adding new student user...");
            res.render('./Register_Pages/student_register'); //Replace with a custom error page for our websit 
        }
    }
};

const teacherRegister = async (req, res) => {
    //Get data entries from the teacher registration form
    const data = req.body; 
    var firstname = data.fname;
    var lastname = data.lname;
    var emailaddress = data.emailadd;
    var pswd = data.pass;
    var confirmpassword = data.confirmpass;
    var birth = data.bday;
    var state = data.state;
    var school = data.school;

    var errorMessages = []; //Holds all the error messages found during validation check of users information
    
    errorMessages = requiredInputCheck(firstname, lastname, emailaddress, pswd, confirmpassword, birth, state, school);

    try{
        var x = await doesEmailAlreadyExist(emailaddress);
        if(x){ //The user's email already exist on our website
            errorMessages.push({ msg: "Email already in use" });
        }
        else{
            pswd = encryptPassword(pswd); //Email is unique so encrypt the user's password
        }
    }
    catch{
        console.log("Database connection error on check vaild email..."); //Replace with a custom error page
    }
    
    if(errorMessages.length > 0){ //An error has occurred in validating the user registration process
        res.render('./Register_Pages/teacher_register', {errorMessages, firstname, lastname, emailaddress, birth, state, school});
    }
};

module.exports = {
    studentRegister,
    teacherRegister
};