const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const checkStudentAccount = (req, res) => { 
    const data = req.body;

    var firstname = data.firstname;
    var lastname = data.lastname;
    var emailaddress = data.emailaddress;
    var pswd = data.pswd;
    var confirmpassword = data.confirmpassword;
    var birth = data.birthdate;
    var state = data.state;
    var genderMale = data.genderMale;
    var genderFemale = data.genderFemale;

    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/;// (1 digit, 1 uppercase, 1 lowercase, minimum 8 characters)
    var failCase = false;
    var returnMesssage = '';
   
    if (firstname == '' || lastname =='' || emailaddress =='' || pswd =='' || confirmpassword ==''){
        returnMesssage += "*** All fields are required";
        failCase = true;
    }
    
    if ((firstname.length < 3) || (firstname.length > 20)){
        returnMesssage += "*** Username must be between 2 and 20 characters in length";	
        failCase =true;
    }
   
    if(!isNaN(firstname)){
        returnMesssage += "*** Only characters are allowed";
        failCase =true;
    }
    
    if (pswd.match(passw)){
        returnMesssage += "*** Password requirements: 1 digit, 1 uppercase, 1 lowercase, minimum 8 characters.";
        failCase = true;
    }
    
    if(pswd.localeCompare(confirmpassword)){
        returnMesssage += "*** Passwords do not match";
        failCase = true;
    }
    
    if(failCase){ //Wrong info was given
        res.json({
            status: returnMesssage
        }); 
    }
    else{
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            port: '3306',
            database: 'mydb',
        });
        
        db.connect((err) => {
            if(err){
                throw err;
            }
            //Check user email to see if it exist

            //Hash Password
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(pswd, salt);
            
            //Check user gender answer
            var userGender = null;
            if(genderMale){
                userGender = 'Male';
            }
            if(genderFemale){
                userGender = 'Female';
            }

            //Check Date of Birth 
            if(birth === "") {
                birth = null;
            }

            //Check State
            if(state === ""){
                state = null;
            }

            let insertion = {Name: firstname + " " + lastname, Email: emailaddress, Password: hash, Gender: userGender, 'Date of Birth': birth, State: state };
            let sql = 'INSERT INTO user SET ?';
        });

        res.json({
            status: "Success"
        });
    }
};

const checkTeacherAccount = (error, req, res) => {

};

module.exports = {
    checkStudentAccount,
    checkTeacherAccount
};