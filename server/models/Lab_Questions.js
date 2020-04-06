const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myLabQuestions = db.define('lab questions', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    Question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Order: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    LabID: {
        type: Sequelize.INTEGER,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'lab questions'
});

module.exports = {
    myLabQuestions
};