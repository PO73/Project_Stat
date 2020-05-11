const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myQuiz = db.define('quiz', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    passing_grade: {
        type: Sequelize.INTEGER,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quiz'
}), Quiz_Section = db.define('quiz section',{
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
    }
});

myQuiz.hasOne(Quiz_Section, {foreignKey: 'quiz_ID'});

module.exports = {
    myQuiz
};