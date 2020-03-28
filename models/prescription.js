const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Prescription = sequelize.define('Prescription', {
    prescription_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    prescription_date: {
        type: Sequelize.STRING
    },
    patient_id: {
        type: Sequelize.INTEGER
    },
    doctor_id: {
        type: Sequelize.INTEGER
    },
    hospital_id : {
        type: Sequelize.INTEGER
    }
},{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Prescription;