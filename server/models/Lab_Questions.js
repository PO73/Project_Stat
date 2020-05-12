const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;
const Lab = require('../models/Lab').myLab;

const myLabQuestions = db.define('lab question', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    order: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    question_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lab_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    feedback: {
        type: Sequelize.STRING,
        allowNull: false
    },
    option_set: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    correct_answer: {
        type: Sequelize.STRING,
        allowNull: false
    }, }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'lab question'
});

myLabQuestions.belongsTo(Lab, {foreignKey : 'ID'});

module.exports = {
    myLabQuestions
};