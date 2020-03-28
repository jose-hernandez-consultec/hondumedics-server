const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Medication = sequelize.define('Medication', {
    medication_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    medication_name: {
        type: Sequelize.STRING
    },
    dosaje: {
        type: Sequelize.STRING
    },
    medication_cost: {
        type: Sequelize.DECIMAL(10,2)
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Medication;