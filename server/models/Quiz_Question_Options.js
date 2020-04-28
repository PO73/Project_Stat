const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myQuizQuestionOptions = db.define('quiz question options', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    QuestionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    QuizID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Feedback: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Correct: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quiz question options'
});

module.exports = {
    myQuizQuestionOptions
};