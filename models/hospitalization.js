const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Hospitalization = sequelize.define('Hospitalization', {
    hospitalization_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hospitalization_date: {
        type: Sequelize.STRING
    },
    patient_id:{
        type: Sequelize.INTEGER
    },
    hospital_id: {
      type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Hospitalization;