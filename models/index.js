const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Admin = require('./admin');
const Patient = require('./patient');


const DoctorRequest = require('./doctorRequest');
const Doctor = require('./doctor');
const DoctorProfile = require('./doctorProfile');
const PatientProfile = require('./patientProfile');

const DoctorPatientAppointment = require('./doctorPatientAppointment')


/** Relationship between Entities */
Doctor.hasOne(DoctorProfile, { foreignKey: 'doctor_id', as: "Doctor_Profile"})
DoctorProfile.belongsTo(Doctor, { foreignKey: 'doctor_id', constraints: false, as: 'doctor'})

Patient.hasOne(PatientProfile, { foreignKey: "patient_id", as: "Patient_Profile"})
PatientProfile.belongsTo(Patient, { foreignKey: 'patient_id', constraints: false, as: 'patient'})

//User.hasMany(Post, { foreignKey: 'user_id', as: 'Posts' });
//Post.belongsTo(User, { foreignKey: 'user_id', constraints: false, as: 'user' });

module.exports = {
    sequelize,
    Patient,
    Admin,
    DoctorRequest,
    Doctor,
    DoctorPatientAppointment,
    DoctorProfile,
    PatientProfile
};