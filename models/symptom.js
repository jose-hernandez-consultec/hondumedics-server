const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Symptom = sequelize.define('Symptom', {
    symptom_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    symptom_name: {
        type: Sequelize.STRING
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Symptom;