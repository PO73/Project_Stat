const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({
    host: process.env.DATABASEHOST,
    user: process.env.DATABASEUSER,
    password: process.env.DATABASEPASSWORD,
    port: process.env.DATABASEPORT,
    database: process.env.DATABASE,
    checkExpirationInterval: 1800000, //30 minutes
    expiration: 7200000, //2 hours 
});

const myStore = session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    maxAge: 7200000, //2 hours
    store: sessionStore,
    cookie: { 
        sameSite: true, //The "SameSite" attribute limits the scope of the cookie such that it will only be attached to requests if those requests are same-site
        secure: false //This should be true, but requires a HTTPS connection
    } 
});

module.exports = {
    myStore
};