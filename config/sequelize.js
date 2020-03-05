const Sequelize = require('sequelize');
const config = require('../config');

const { database, username, password } = config.db;

const sequelize = new Sequelize(
    database, username, password, {host:config.db.host, port: config.db.port, dialect: config.db.dialect}
);

module.exports = sequelize;