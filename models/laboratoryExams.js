const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const LaboratoryExams = sequelize.define('LaboratoryExams',{
    laboratory_exam_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    laboratory_exam_name: {
        type: Sequelize.STRING
    },
    exam_cost: {
        type: Sequelize.DECIMAL(10, 2)
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = LaboratoryExams;