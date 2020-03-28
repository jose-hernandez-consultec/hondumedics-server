const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const DoctorExperience = sequelize.define('DoctorExperience', {
    experience_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    company_name: {
        type: Sequelize.STRING
    },
    job_title: {
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
    current_job: {
        type: Sequelize.BOOLEAN
    },
    doctor_id: {
        type: Sequelize.INTEGER
    }
}, {
        createAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        underscored: true,
        unserscoredAll: true
});

module.exports = DoctorExperience;