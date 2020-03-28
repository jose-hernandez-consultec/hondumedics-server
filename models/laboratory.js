const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Laboratory = sequelize.define('Laboratory', {
    laboratory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    laboratory_name: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Laboratory;