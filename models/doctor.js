const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Doctor = sequelize.define('Doctor', {
    doctor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name:{
        type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: { type: Sequelize.STRING(1024), },
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