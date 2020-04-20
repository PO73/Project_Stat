const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myLabImages = db.define('lab images', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    LabID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Imagepath: {
        type: Sequelize.STRING,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'lab images'
});

module.exports = {
    myLabImages
};