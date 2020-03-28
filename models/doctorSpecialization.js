const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const DoctorSpecialization = sequelize.define('DoctorSpecialization', {
    doctor_specialization_relation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    doctor_id: {
        type: Sequelize.INTEGER
    },
    specialization_id: {
        type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = DoctorSpecialization;