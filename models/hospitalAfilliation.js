const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const HospitalAfilliation = sequelize.define('HospitalAfilliation', {
    hospital_afilliation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    start_date: {
        type: Sequelize.STRING
    },
    end_date: {
        type: Sequelize.STRING
    },
    doctor_id: {
        type: Sequelize.INTEGER
    },
    hospital_id: {
        type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = HospitalAfilliation;