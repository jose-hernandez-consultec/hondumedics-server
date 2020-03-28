const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const PatientLabExams = sequelize.define('PatientLabExams', {
    patient_lab_exam_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    laboratory_exam_id: {
        type: Sequelize.INTEGER
    },
    patient_id: {
        type: Sequelize.INTEGER
    },
    doctor_id: {
        type: Sequelize.INTEGER
    },
    exam_date: {
        type: Sequelize.STRING
    },
    laboratory_id: {
        type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = PatientLabExams;