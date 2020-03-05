const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Admin = require('./admin');
const Patient = require('./patient');


const DoctorRequest = require('./doctorRequest');
const Doctor = require('./doctor');
const DoctorProfile = require('./doctorProfile');

/** Relationship between Entities */
DoctorProfile.belongsTo(Doctor, { foreignKey: 'doctor_id', constraints: false, as: 'doctor'})

//User.hasMany(Post, { foreignKey: 'user_id', as: 'Posts' });
//Post.belongsTo(User, { foreignKey: 'user_id', constraints: false, as: 'user' });

module.exports = {
    sequelize,
    Patient,
    Admin,
    DoctorRequest,
    Doctor,
    DoctorProfile
};