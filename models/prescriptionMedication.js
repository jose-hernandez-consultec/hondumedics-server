const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const PrescriptionMedication = sequelize.define('PrescriptionMedication', {
    prescription_medication_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prescription_id:{
        type: Sequelize.INTEGER
    },
    medication_id: {
      type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = PrescriptionMedication;