const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Hospital = sequelize.define('Hospital', {
    hospital_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    hospital_name: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    department: {
        type: Sequelize.STRING
    },
    directions: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Hospital;