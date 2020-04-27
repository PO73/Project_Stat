const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myQuizSectionInstructions = db.define('quiz section instructions', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    Instructiontext: {
        type: Sequelize.STRING,
        allowNull: false
    },
    QuizsectionID: {
        type: Sequelize.INTEGER,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quiz section instructions'
});

module.exports = {
    myQuizSectionInstructions
};