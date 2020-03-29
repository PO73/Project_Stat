const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const user = db.define('user', {
    Firstname: {
        type: Sequelize.STRING
    },
    Lastname: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    },
    Password:{
        type: Sequelize.STRING
    },
    State: {
        type: Sequelize.STRING
    },
    Usertype: {
        type: Sequelize.STRING
    }
});

module.exports = {
    user
}