const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myOption = db.define('option set', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    setID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'option set'
});

module.exports = {
    myOption
};