const Sequelize = require('sequelize');

const myConnection = new Sequelize(process.env.DATABASE, process.env.DATABASEUSER, process.env.DATABASEPASSWORD, {
  host: process.env.DATABASEHOST,
  dialect: 'mysql',
  pool: {
    max: 500,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = {
    myConnection
};