const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const DoctorPatientAppointment = sequelize.define('DoctorPatientAppointment', {
    appointment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    appointment_date: {
        type: Sequelize.STRING
    },
    hospital_id: {
        type: Sequelize.INTEGER
    },
    doctor_id: {
        type: Sequelize.INTEGER
    },
    doctor_name: {
        type: Sequelize.STRING
    },
    doctor_picture: {
        type: Sequelize.STRING
    },
    approved: {
        type: Sequelize.INTEGER
    },
    hospital_name: {
        type: Sequelize.STRING
    },
    patient_id: {
        type: Sequelize.INTEGER
    },
    patient_name:{
        type: Sequelize.STRING
    },
    patient_picture:{
        type: Sequelize.STRING
    },
    patient_email: {
        type: Sequelize.STRING
    },
    patient_number: {
        type: Sequelize.STRING
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = DoctorPatientAppointment;