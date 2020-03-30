const registerHelper = require('./registerHelper');

async function teacherRegister (req, res) {
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
    
    errorMessages = registerHelper.requiredInputCheck(firstname, lastname, emailaddress, pswd, confirmpassword, birth, state, school);
};

module.exports = {
    teacherRegister
}