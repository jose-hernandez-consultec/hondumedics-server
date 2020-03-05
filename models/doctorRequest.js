const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const DoctorRequest = sequelize.define('DoctorRequest', {
    request_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    doctor_number: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    requestApproved: {
        type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = DoctorRequest;