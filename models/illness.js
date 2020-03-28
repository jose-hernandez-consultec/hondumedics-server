const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Illness = sequelize.define('Illness', {
    illness_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    illness_name: {
        type: Sequelize.STRING
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Illness;