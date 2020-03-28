const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const DoctorEducation = sequelize.define('DoctorEducation', {
    education_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    institute_name: {
        type: Sequelize.STRING
    },
    degree_obtained: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    start_date: {
        type: Sequelize.STRING
    },
    end_date: {
        type: Sequelize.STRING
    },
    current_education: {
        type: Sequelize.BOOLEAN
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

module.exports = DoctorEducation;