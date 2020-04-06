const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myLabImages = db.define('lab image', {
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
    modelName: 'lab image'
});

module.exports = {
    myLabImages
};