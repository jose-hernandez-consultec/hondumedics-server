var express = require('express');
var router = express.Router();

const { Hospital } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        Hospital.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/newHospital')
    .post((req, res) => {
        console.log(req.body);
        return Hospital.create(
            {
                hospital_name: req.body.hospital_name,
                city:req.body.city,
                department:req.body.department,
                directions:req.body.directions,
                country:req.body.country,
            },
            { 
                fields: [
                    "hospital_name",
                    "city",
                    "department", 
                    "location",
                    "directions",
                    "country"
                ] 
            }
        ).then(function (result) {
            console.log(result);
            var hospital = result.dataValues; //the instance of the admin
            res.status(200).send({added: true, hospital:hospital});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

 module.exports = router;