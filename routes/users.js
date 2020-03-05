var express = require('express');
var router = express.Router();

const { User } = require('../models');

/* GET users listing. */

router.route('/')
    .get((req, res) => {
        User.findAll({ attributes: { exclude: ['password'] } })
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/addNewUser')
    .post((req, res) => {
        console.log(req.body);
        return User.create({
            username: req.body.username,
            password: req.body.password
        }).then(function (users) {
            if (users) {
                res.send(users);
            } else {
                res.status(400).send('Error in insert new record');
            }
        });
    });

module.exports = router;