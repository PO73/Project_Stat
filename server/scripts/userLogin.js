const bcrypt = require('bcryptjs');

//Basic input check to see if user has completed the form correctly
requiredInputCheck = (emailaddress, pswd) =>{
    var sc = new RegExp(/[!#$%^&*\\/(),?":\'{}\s=`~+|<>]/);
    var pr = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/);
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
    
}

const userLogin = async (req, res) => { 
    const data = req.body;
    var emailaddress = data.emailadd;
    var pswd = data.pass;

    var errorMessages = []; //Holds all the error messages found during validation check of users information
    
    errorMessages = requiredInputCheck(emailaddress, pswd);
   
    if(errorMessages.length > 0){ //An error has occurred in validating the user registration process
        res.render('./Login_Page/login', {errorMessages, emailaddress});
    }
    else {
        try{
            var x = await loginThisUser(emailaddress, pswd);
            console.log(x);
            if(x){

            }
            else{
                errorMessages.push({msg: "Either the password or email are incorrect"});
                res.render('./Login_Page/login', {errorMessages, emailaddress});
            }
        } catch(error){
            errorMessages.push({msg: "Failed to log in user..."});
            res.render('./Login_Page/login', {errorMessages, emailaddress});
        }
    }
}

module.exports = {
    userLogin,
};