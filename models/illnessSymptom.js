const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const IllnessSymptom = sequelize.define('IllnessSymptom', {
    illness_symptom_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    symptom_id:{
        type: Sequelize.INTEGER
    },
    illness_id: {
      type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = IllnessSymptom;