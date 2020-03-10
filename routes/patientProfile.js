var express = require('express');
var router = express.Router();

const { PatientProfile } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        PatientProfile.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

module.exports = router;