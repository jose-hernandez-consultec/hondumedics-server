const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Patient = sequelize.define('Patient', {
    patient_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: { type: Sequelize.STRING(1024), },
    tos_approved: {
        type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Patient;