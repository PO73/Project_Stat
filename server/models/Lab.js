const Sequelize = require('sequelize');
const db = require('../config/sequelize').myConnection;

const myLab = db.define('lab', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    research_scenario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    directions: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    passing_grade:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image_path:{
        type: Sequelize.STRING,
        allowNull: false
    } }, {
    db,
    timestamps: false,
    freezeTableName: true,
    modelName: 'lab'
}), Lab_Question = db.define('lab question', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    order: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    question_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lab_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    feedback: {
        type: Sequelize.STRING,
        allowNull: false
    },
    option_set: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    correct_answer: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

myLab.hasMany(Lab_Question, {foreignKey: 'lab_id'});

module.exports = {
    myLab
};