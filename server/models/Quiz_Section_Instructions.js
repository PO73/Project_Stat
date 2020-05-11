const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;
const myQuizSection = require('../models//Quiz_Section').myQuizSection;

const myQuizSectionInstructions = db.define('quiz section instruction', {
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
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quiz section instruction'
}), Quiz_Question = db.define('quiz question', {
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
    }
});

myQuizSectionInstructions.belongsTo(myQuizSection, {foreignKey: 'ID'});
myQuizSectionInstructions.hasOne(Quiz_Question, {foreignKey: 'quiz_section_instruction_id'});

module.exports = {
    myQuizSectionInstructions
};