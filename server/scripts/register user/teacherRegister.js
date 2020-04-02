const registerHelper = require('./registerHelper');
const Teahcer = require('../../models/Teacher').myTeacher;

//Create a row in the student table that related to the newly generated user
function createNewTeacher(userID, schoolname, state){
    return new Promise((resolve, reject) => {
        Teahcer.create({ UserID: userID, Schoolname: schoolname, State: state})
        .then(newTeacher => { //New user created
            resolve(true);
        })
        .catch(error => { //New user not created
            reject(true);
        })
    });
}


async function teacherRegister (req, res) {
    //Get data entries from the teacher registration form
    let { fname, lname, emailadd, pass, confirmpass, state, school } = req.body;

    var errorMessages = []; //Holds all the error messages found during validation check of users information
    
    errorMessages = registerHelper.requiredInputCheck(fname, lname, emailadd, pass, confirmpass, "", state, school);
    
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
        res.render('./Register_Pages/teacher_register'); //Replace with a custom error page for our websit
    }
    
    if(errorMessages.length > 0){ //An error has occurred in validating the user registration process
        res.render('./Register_Pages/teacher_register', {errorMessages, fname, lname, emailadd});
    }
    else {
        try{
            var x = await registerHelper.createNewUser(fname, lname, emailadd, pass, "teacher"); //var x will contain the new ID for the student
            if(x > 0){ //The teacher user was successfully added to the DB
                try {
                    var y = await createNewTeacher(x, school, state);
                    if(y){
                        //create session
                        req.session.active = "true"; //This ensure the session id does not changes upon new request, and stores in DB (idk with this middleware) 
                        //req.session.save(); //Stores the session id in DB but does not keep the session id on next request
                        var userSessionID = req.sessionID;
                        try {
                            var z = await registerHelper.storeSessionID(emailadd, userSessionID);
                            if(z){
                                res.redirect('/user/teacherdashboard'); //redirect the user to the teacher dashboard
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    else{
                        errorMessages.push({msg: "Failed to create new teacher..."});
                        res.render('./Register_Pages/teacher_register', {errorMessages, fname, lname, emailadd});
                    }
                } catch {
                    console.log("Database connection error on adding new student user...");
                     res.render('./Register_Pages/teacher_register'); //Replace with a custom error page for our websit 
                }
            }
            else{
                errorMessages.push({msg: "Failed to create new user..."});
                res.render('./Register_Pages/teacher_register', {errorMessages, fname, lname, emailadd});
            }
        }
        catch{
            console.log("Database connection error on adding new student user...");
            res.render('./Register_Pages/teacher_register'); //Replace with a custom error page for our websit 
        }
    }
};

module.exports = {
    teacherRegister
}