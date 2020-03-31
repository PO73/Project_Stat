const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myTeacher = db.define('teacher', {
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
    Schoolname: {
        type: Sequelize.STRING
    },
    State: {
        type: Sequelize.STRING
    }
    }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'teacher'
});

module.exports = {
    myTeacher
};