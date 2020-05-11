const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;
const myQuizSectionInstruction = require('../models/Quiz_Section_Instructions').myQuizSectionInstructions;

const myQuizQuestion = db.define('quiz question', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    quiz_section_instruction_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    order: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    question_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image_path: {
        type: Sequelize.STRING
    },
    correct_answer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    option_set_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quiz_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quiz question'
});

myQuizQuestion.belongsTo(myQuizSectionInstruction, {foreignKey: 'ID'});

module.exports = {
    myQuizQuestion
};