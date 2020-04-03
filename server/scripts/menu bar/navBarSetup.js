const User = require('../../models/User').myUser;

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

async function setNavBar(sessionRequest){
    try {
        var x = await getUserType(sessionRequest);
        var path = 'undefined';
        if(x.localeCompare('student') == 0){
            path = '/user/studentdashboard';
            return path;
        }
        else if(x.localeCompare('teacher') == 0){
            path = '/user/teacherdashboard';
            return path;
        }
        else if(x.localeCompare('admin') == 0){
            path = '/user/adminDashboard';
            return path;
        }
        else{
            return null;
        }
    } catch (error) {
        console.log(error); //Replace this will a custom error page for our website
    }
}

module.exports = {
    setNavBar,
}