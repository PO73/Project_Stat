//The SQL calles on this page need to be rewriten at some point
//Also the session store is causing a few issues on this page

const User = require('../../models/User').myUser;
const Session = require('../../models/Sessions').mysessions;

//Check to see if the current session belongs to a logged in user
function checkUserSession(sessionRequest) {
    return new Promise((resolve, reject) => {
        User.findAll({where: { SessionID: sessionRequest }})
        .then(activeUser => {
            if(activeUser.length > 0){ //A user is logged in with this session id
                resolve(true);
            }
            else{ //No user is logged in with this session id
                resolve(false);
            }
        })
        .catch(error => { //Error occured during the query
            reject(true);
        });
    });
}

//Check to see if the current session is still active
function checkActiveSession(sessionRequest){
    return new Promise((resolve, reject) => {
        Session.findAll({where: { session_id: sessionRequest }})
            .then(session => {
            if(session.length > 0){ //The session is active
                resolve(true);
            }
            else{ //The session is not active
                resolve(false);
            }
        })
        .catch(error => { //Error occured during the query
            reject(true);
        });
    });
}

//Check to see if the user is an admin, teacher, or student (Should only be called after isUserAlreadyLogedIn permission check)
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

//Check to see if the current user's session is valid (Should be called on every request in the user router)
async function isUserAlreadyLogedIn (req, res, next) {
    var sessionRequest = req.sessionID;
    try{
        var x = await checkUserSession(sessionRequest);
        if(x){ //User has a session id that matches the current session id
            try {
                var y = await checkActiveSession(sessionRequest);
                if(y){ //The session id is active
                    return next(); //Move onto the next process 
                }
                else{ //Session is has expired and is no longer valid
                    res.redirect('/login'); //Force the user back to the login page
                }
            } catch (error) {
                console.log("Session error check on user 2"); //Replace this will a custom error page for our website
            }
        }
        else{ //Session id does not belong to an active user 
            res.redirect('/login'); //Force the user back to the login page
        }
    }
    catch{
        console.log("Session error check on user 1"); //Replace this will a custom error page for our website
    }
}

//Check to see if a user is a teacher (Should only be called on pages unquie to teacher)
async function isUserTeacher (req, res, next ) {
    var sessionRequest = req.sessionID;
    try {
        var x = await getUserType(sessionRequest);
        if(x.localeCompare('student') == 0){
            res.redirect('/user/studentdashboard'); //Students can't go to teacher urls, so redirect them back to their dashboard
        }
        else if(x.localeCompare('teacher') == 0){
            return next(); //The user is a teacher so move on to the next process
        }
        else if(x.localeCompare('admin') ==0){
            res.redirect('/user/admindashboard'); //Admins can't go to teacher urls, so redirect them back to their dashboard
        }
        else{
            console.log("Unknown user type")
        }
    } catch (error) {
        console.log("teacher permission error"); //Replace this will a custom error page for our website
    }
}

//Check to see if a user is a student (Should only be called on pages unquie to students)
async function isUserStudent (req, res, next) {
    var sessionRequest = req.sessionID;
    try {
        var x = await getUserType(sessionRequest);
        if(x.localeCompare('student') == 0){
            return next(); //The user is a student so move on to the next process
        }
        else if(x.localeCompare('teacher') == 0){
            res.redirect('/user/teacherdashboard'); //Teachers can't go to student urls, so redirect them back to their dashboard
        }
        else if(x.localeCompare('admin') == 0){
            res.redirect('/user/admindashboard'); //Admins can't go to student urls, so redirect them back to their dashboard
        }
        else{
            console.log("Unknown user type")
        }
    } catch (error) {
        console.log("student permission error"); //Replace this will a custom error page for our website
    }
}

//Check to see if a user is a admin (Should only be called on pages unquie to admin)
async function isUserAdmin (req, res, next) {
    var sessionRequest = req.sessionID;
    try {
        var x = await getUserType(sessionRequest);
        if(x.localeCompare('student') == 0){
            res.redirect('/user/studentdashboard'); //Teachers can't go to admin urls, so redirect them back to their dashboard
        }
        else if(x.localeCompare('teacher') == 0){
            res.redirect('/user/teacherdashboard'); //Teachers can't go to admin urls, so redirect them back to their dashboard
        }
        else if(x.localeCompare('admin') == 0){
            return next(); //The user is a admin so move on to the next process
        }
        else{
            console.log("Unknown user type")
        }
    } catch (error) {
        console.log("admin permission error"); //Replace this will a custom error page for our website
    }
}

//Check to see if a user is logged in an attempting to create/login a/into account (only call on the idex router for login/register/forgotpassword)
async function isUserCurrentlyRegistered (req, res, next) {
    var sessionRequest = req.sessionID;
    try{
        var x = await checkUserSession(sessionRequest);
        if(x){ //User has a session id that matches the current session id
            try {
                var y = await checkActiveSession(sessionRequest);
                if(y){ //The session id is active
                    try {
                        var x = await getUserType(sessionRequest);
                        if(x.localeCompare('student') == 0){
                            var userDash = '/user/studentdashboard';
                            res.render('./Student_Pages/studentDashboard', {userDash}); //Load the student dashboard
                        }
                        else if(x.localeCompare('teacher') == 0){
                            var userDash = '/user/teacherdashboard';
                            res.render('./Teacher_Pages/teacherDashboard', {userDash}); //Load the teacher  dashboard
                        }
                        else if(x.localeCompare('admin') == 0){
                            var userDash = '/user/adminDashboard';
                            res.render('./Admin_Pages/adminDashboard', {userDash}); //Load the admin  dashboard
                        }
                        else{
                            console.log("Unknown user type")
                        }
                    } catch (error) {
                        console.log("Permission Error"); //Replace this will a custom error page for our website
                    }
                }
                else{ //Session is has expired and is no longer valid
                    return next(); //The user is not logged in so let them be
                }
            } catch (error) {
                console.log("Session error check on user 22"); //Replace this will a custom error page for our website
            }
        }
        else{ //Session id does not belong to an active user 
            return next(); //The user is not logged in so let them be
        }
    }
    catch{
        console.log("Session error check on user 11"); //Replace this will a custom error page for our website
    }
}

module.exports = {
    isUserAlreadyLogedIn,
    isUserStudent,
    isUserTeacher,
    isUserAdmin,
    isUserCurrentlyRegistered
}