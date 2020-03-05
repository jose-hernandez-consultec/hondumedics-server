var express = require('express');
var router = express.Router();

const { DoctorProfile } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        DoctorProfile.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

module.exports = router;