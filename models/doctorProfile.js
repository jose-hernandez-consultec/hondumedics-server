const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const DoctorProfile = sequelize.define('DoctorProfile', {
    doctor_profile_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    birthdate: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    profile_picture: {
        type: Sequelize.STRING
    },
    doctor_id: { 
        type: Sequelize.INTEGER 
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = DoctorProfile;