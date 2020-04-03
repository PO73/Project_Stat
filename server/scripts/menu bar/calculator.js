const User = require('../../models/User').myUser;
const Session = require('../../models/Sessions').mysessions;
const navBar = require('./navBarSetup');

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

async function isUserActive(sessionID) {
    try{
        var x = await checkUserSession(sessionID);
        if(x){ //User has a session id that matches the current session id
            try {
                var y = await checkActiveSession(sessionID);
                if(y){ //The session id is active
                    return navBar.setNavBar(sessionID);
                }
                else{ //Session is has expired and is no longer valid
                    return null;
                }
            } catch (error) {
                console.log("Session error check on user 2"); //Replace this will a custom error page for our website
            }
        }
        else{ //Session id does not belong to an active user 
            return null;
        }
    }
    catch{
        console.log("Session error check on user 1"); //Replace this will a custom error page for our website
    }
}

module.exports = {
    isUserActive
}