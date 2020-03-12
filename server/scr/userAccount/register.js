const mysql = require('mysql');
const bcrypt = require('bcryptjs');

//Connect to DB
const db = mysql.createPool({
    connectionLimit : 50,
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: '3306',
    database: 'mydb',
});

//Check user email to see if it exist
function checkEmail(emailaddress) {
    return new Promise((resolve, reject) => {
        let emailCheck = {Email: emailaddress};
        let mySqlCheck = 'SELECT EXISTS(SELECT * FROM user WHERE ?)';
        db.query(mySqlCheck, emailCheck, (err, results) => {
            if(err){
                return reject(1);
            }
            else{
                var jsonThing = JSON.parse(JSON.stringify(results[0]))
                for (var key in jsonThing) {
                    return resolve(jsonThing[key]);
                }
                return reject(1);
            }
        });
    });
}

//Add user to the database
function pushNewUser(firstname, lastname, emailaddress, hash, userGender, birth, state, type){
    return new Promise((resolve, reject) => {
        let insertion = {Name: firstname + " " + lastname, Email: emailaddress, Password: hash, Gender: userGender, 'Date of Birth': birth, State: state, 'User Type': type };
        let sql = 'INSERT INTO user SET ?';
        db.query(sql, insertion, (err, result) => {
            if(err){
                return reject(false);
            } 
            else{
                return resolve(true);
            }
        });
    });
}

const checkStudentAccount = async (req, res) => { 
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
            status: returnMesssage,
            URL: 'html/registration.html'
        }); 
    }
    else{
        var isEmailUnique = false;
        try{
            var x = await checkEmail(emailaddress);
            if(x > 0){
                isEmailUnique = false;
            }
            else{
                isEmailUnique = true;
            }
        } catch(error){
            isEmailUnique = false;
        }
        
        if(isEmailUnique){
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

            //Attempt to add user to database
            try{
                var x = await pushNewUser(firstname, lastname, emailaddress, hash, userGender, birth, state, "Student");
                if(x){
                    console.log("User Added");
                    res.json({
                        status: "Success",
                        URL: 'studentDashboard'
                    });
                }
                else{
                    console.log("User Not Added");
                }
            }
            catch{
                res.json({
                    status: "Sever error...",
                    URL: 'html/registration.html'
                });
            }
        }
        else{
            res.json({
                status: "Email in use...",
                URL: 'html/registration.html'
            });
        }
    }
};

const checkTeacherAccount = (error, req, res) => {

};

module.exports = {
    checkStudentAccount,
    checkTeacherAccount
};