const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const DoctorReview = sequelize.define('DoctorReview', {
    review_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    revieww_date: {
        type: Sequelize.STRING
    },
    rating:{
        type: Sequelize.INTEGER
    },
    comments: {
      type: Sequelize.STRING
    },
    doctor_id: { 
        type: Sequelize.INTEGER 
    },
    patient_id: {
        type: Sequelize.INTEGER
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = DoctorReview;