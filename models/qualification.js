const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Qualification = sequelize.define('Qualification', {
    qualification_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    doctor_id: {
        type: Sequelize.INTEGER
    },
    qualification_name: {
        type: Sequelize.STRING
    },
    institute_name: {
        type: Sequelize.STRING
    },
    initial_date: {
        type: Sequelize.STRING
    },
    end_date: {
        type: Sequelize.STRING
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Qualification;