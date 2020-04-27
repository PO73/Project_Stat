const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myQuizSection = db.define('quiz section', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    Section: { //The section title
        type: Sequelize.STRING,
        allowNull: false
    },
    QuizID: {
        type: Sequelize.INTEGER,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quiz section'
});

module.exports = {
    myQuizSection
};