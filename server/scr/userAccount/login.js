const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const ejs = require('ejs');

//Connect to DB
const db = mysql.createPool({
    connectionLimit : 50,
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: '3306',
    database: 'mydb',
});

//Get user email from user tabel
function loginThisUser(emailaddress, password) {
    return new Promise((resolve, reject) => {
        let emailCheck = {Email: emailaddress};
        let mySqlCheck = 'SELECT * FROM user WHERE ?';
        db.query(mySqlCheck, emailCheck, (err, results) => {
            if(err){
                return reject(false);
            }
            else{
                if(results[0]){
                    var jsonThing = JSON.parse(JSON.stringify(results[0]));

                    var storedPassword = '';
                    jsonThing.Password.data.forEach(element => {
                        storedPassword += String.fromCharCode(element);
                    });
    
                    var passwordCorrect = false;
                    passwordCorrect = bcrypt.compareSync(password, storedPassword);
                    return resolve(passwordCorrect);
                }
                else{
                    return reject(false);
                }
            }
        });
    });
}

const loginUser = async (req, res) => { 
    const data = req.body;

    var emailaddress = data.emailaddress;
    var pswd = data.pswd;
   
    if (emailaddress == '' || pswd == '') {
        res.json({
            status: "Email and Password are required fields...",
            URL: "html/login.html"
        });
        return;
    }

    try{
        var x = await loginThisUser(emailaddress, pswd);
        if(x){
            res.json({
                status: "Success",
                URL: "studentDashboard"
            });
        }
        else{
            res.json({
                status: "Password or Email was incorrect...",
                URL: "html/login.html"
            });
        }
    } catch(error){
        res.json({
            status: "Server Error...",
            URL: "html/login.html"
        });
    }
}

module.exports = {
    loginUser,
};