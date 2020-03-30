const registerHelper = require('./registerHelper');

async function studentRegister (req, res) {
    //Get data entries from the student registration form
    let { fname, lname, emailadd, pass, confirmpass, bday, state, gender } = req.body;

    var errorMessages = []; //Holds all the error messages found during validation check of users information

    errorMessages = registerHelper.requiredInputCheck(fname, lname, emailadd, pass, confirmpass, bday, state, gender);

    try{
        var x = await registerHelper.doesEmailAlreadyExist(emailadd);
        if(x){ //The user's email already exist on our website
            errorMessages.push({ msg: "Email already in use" });
        }
        else{
            pass = registerHelper.encryptPassword(pass); //Email is unique so encrypt the user's password
        }
    }
    catch{
        console.log("Database connection error on check vaild email...");
        res.render('./Register_Pages/student_register'); //Replace with a custom error page for our websit
    }
    
    if(errorMessages.length > 0){ //An error has occurred in validating the user registration process
        res.render('./Register_Pages/student_register', {errorMessages, fname, lname, emailadd});
    }
    else {
        try{
            var x = await registerHelper.createNewUser(fname, lname, emailadd, pass, "student");
            if(x){ //The student user was successfully added to the DB
                res.redirect('/user/studentdashboard');
            }
            else{
                errorMessages.push({msg: "Failed to create new student user..."});
                res.render('./Register_Pages/student_register', {errorMessages, fname, lname, emailadd});
            }
        }
        catch{
            console.log("Database connection error on adding new student user...");
            res.render('./Register_Pages/student_register'); //Replace with a custom error page for our websit 
        }
    }
};

module.exports = {
    studentRegister
}