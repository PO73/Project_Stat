const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myStudent = db.define('student', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        //This needs a foreign key tag
    },
    ClassroomID: {
        type: Sequelize.INTEGER
    },
    DateOfBirth: {
        type: Sequelize.STRING
    },
    Gender: {
        type: Sequelize.STRING
    },
    State: {
        type: Sequelize.STRING
    }
    }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'student'
});

module.exports = {
    myStudent
};