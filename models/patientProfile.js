const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const PatientProfile = sequelize.define('PatientProfile', {
    patient_profile_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    profile_picture: {
      type: Sequelize.STRING
    },
    home_address: {
      type: Sequelize.STRING
    },
    work_address: { type: Sequelize.STRING },
    blood_type: { type: Sequelize.STRING },
    gender: { type: Sequelize.INTEGER },
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

module.exports = PatientProfile;