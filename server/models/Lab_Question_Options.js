const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myLabQuestionOption = db.define('lab question options', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    Text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    LabquestionID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Correctanswer: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    LabID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'lab question options'
});

module.exports = {
    myLabQuestionOption
};