const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myAwards = db.define('awards', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    Unitone: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unittwo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitthree: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Labone: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Labtwo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Labthree: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Labfour: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Labfive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Labsix: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Labseven: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Quizone: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Quiztwo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
    Quizthree: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitonemodulesone: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitonemodulestwo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitonemodulesthree: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitonemodulesfour: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unittwomodulesone: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unittwomodulestwo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unittwomodulesthree: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unittwomodulesfour: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitthreemodulesone: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitthreemodulestwo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitthreemodulesthree: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitthreemodulesfour: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitthreemodulesfive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Unitthreemodulessix: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'awards'
});

module.exports = {
    myAwards
};