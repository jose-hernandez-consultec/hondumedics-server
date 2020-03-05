const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('./user');
const Admin = require('./admin');
const Post = require('./post');
const Patient = require('./patient');
const DoctorRequest = require('./doctorRequest');
const Doctor = require('./doctor');

/** Relationship between Entities */
User.hasMany(Post, { foreignKey: 'user_id', as: 'Posts' });
Post.belongsTo(User, { foreignKey: 'user_id', constraints: false, as: 'user' });

module.exports = {
    sequelize,
    Patient,
    Admin,
    User,
    DoctorRequest,
    Doctor,
    Post
};