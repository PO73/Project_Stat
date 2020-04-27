const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myQuiz = db.define('quiz', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Passinggrade: {
        type: Sequelize.INTEGER,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quiz'
});

module.exports = {
    myQuiz
};