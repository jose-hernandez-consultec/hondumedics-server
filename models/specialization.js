const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Specialization = sequelize.define('Specialization', {
   specialization_id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   specialization_name: {
       type: Sequelize.STRING
   }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Specialization;