const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myQuizQuestion = db.define('quiz question', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    QuizsectionID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    QuizsectioninstructionID: {
        type: Sequelize.INTEGER
    },
    Order: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Questiontype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Imagepath: {
        type: Sequelize.STRING
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quiz question'
});

module.exports = {
    myQuizQuestion
};