const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Doctor = sequelize.define('Doctor', {
    doctor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    password: { type: Sequelize.STRING(1024), },
    phone_number: {
        type: Sequelize.STRING,
        unique: true
    },
    specialty: {
        type: Sequelize.INTEGER
    },
    first_time_logged_in: {
        type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Doctor;