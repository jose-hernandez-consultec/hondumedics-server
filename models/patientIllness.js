const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const PatientIllness = sequelize.define('PatientIllness', {
    patient_illness_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    patient_illness_id: {
        type: Sequelize.INTEGER
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

module.exports = PatientIllness;