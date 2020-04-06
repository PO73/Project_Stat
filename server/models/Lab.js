const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myLab = db.define('lab', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Researchscenario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Directions: {
        type: Sequelize.STRING,
        allowNull: false,
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'lab'
});

module.exports = {
    myLab
};