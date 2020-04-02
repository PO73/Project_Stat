const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const mysessions = db.define('sessions', {
    session_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    expires: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    data: {
        type: Sequelize.STRING
    }
    }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'sessions'
});

module.exports = {
    mysessions
};