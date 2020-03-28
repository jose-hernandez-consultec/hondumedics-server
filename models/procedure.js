const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Procedure = sequelize.define('Procedure', {
    procedure_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    procedure_name: {
        type: Sequelize.STRING
    },
    procedure_date:{
        type: Sequelize.STRING
    },
    procedure_cost: {
        type: Sequelize.DECIMAL(10,2)
    },
    hospitalization_id: {
        type: Sequelize.INTEGER
    },
    patient_id: {
        type: Sequelize.INTEGER
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

module.exports = Procedure;