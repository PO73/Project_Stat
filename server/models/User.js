const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myUser = db.define('user', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    Firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Usertype: {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'user'
});

module.exports = {
    myUser
};