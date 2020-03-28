const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Admin = require('./admin');
const Patient = require('./patient');


const DoctorRequest = require('./doctorRequest');
const Doctor = require('./doctor');
const DoctorProfile = require('./doctorProfile');
const PatientProfile = require('./patientProfile');

const DoctorPatientAppointment = require('./doctorPatientAppointment');

const DoctorExperience = require('./doctorExperience');
const DoctorEducation = require('./doctorEducation');
const Qualification = require('./qualification');
const Hospital = require('./hospital');
const HospitalAfilliation = require('./hospitalAfilliation');
const Specialization = require('./specialization');
const DoctorSpecialization = require('./doctorSpecialization');
const Illness = require('./illness');
const PatientIllness = require('./patientIllness');
const Prescription = require('./prescription');
const Laboratory = require('./laboratory');
const LaboratoryExams = require('./laboratoryExams');
const PatientLabExams = require('./patientLabExams');
const Hospitalization = require('./hospitalization');
const Bill = require('./bill');
const DoctorReview = require('./doctorReview');
const Medication = require('./medication');
const Procedure = require('./procedure');
const Symptom = require('./symptom');
const IllnessSymptom = require('./illnessSymptom');
const PrescriptionMedication = require('./prescriptionMedication');





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
    PatientProfile,
    DoctorExperience,
    DoctorEducation,
    Qualification,
    Hospital,
    HospitalAfilliation,
    Specialization,
    DoctorSpecialization,
    Illness,
    PatientIllness,
    Prescription,
    Laboratory,
    LaboratoryExams,
    PatientLabExams,
    Hospitalization,
    Bill,
    DoctorReview,
    Medication,
    Procedure,
    Symptom,
    IllnessSymptom,
    PrescriptionMedication
};