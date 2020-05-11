const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;
const myQuiz = require('../models/Quiz').myQuiz;

const myQuizSection = db.define('quiz section', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quiz_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quiz section'
}), Quiz_Section_Instruction = db.define('quiz section instruction', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    quiz_section_instruction: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quiz_section_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

myQuizSection.belongsTo(myQuiz, {foreignKey: 'ID'});
myQuizSection.hasOne(Quiz_Section_Instruction, {foreignKey: 'quiz_section_ID'});

module.exports = {
    myQuizSection
};