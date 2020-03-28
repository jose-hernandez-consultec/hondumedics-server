const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Bill = sequelize.define('Bill', {
    bill_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tota_cost: {
        type: Sequelize.DECIMAL(10, 2)
    },
    patient_id: {
        type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Bill;