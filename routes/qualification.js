var express = require('express');
var router = express.Router();

const { Qualification } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        Qualification.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/newDoctorQualification')
    .post((req, res) => {
        console.log(req.body);
        return Qualification.create(
            {
                doctor_id: req.body.doctor_id,
                qualification_name: req.body.qualification_name,
                institute_name: req.body.institute_name,
                initial_date: req.body.initial_date,
                end_date: req.body.end_date
            },
            { 
                fields: [
                    "doctor_id",
                    "qualification_name",
                    "institute_name",
                    "initial_date",
                    "end_date"
                ] 
            }
        ).then(function (result) {
            console.log(result);
            var qualification = result.dataValues; //the instance of the admin
            res.status(200).send({added: true, qualification:qualification});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/getDoctorQualificationByDoctorId')
    .post((req, res) => {
        console.log(req.body);
        //Hash Password first
        return Qualification.findAll(
            {
                where: {
                    doctor_id: req.body.doctor_id
                }
            }
        ).then(function (result) {
            console.log(result);
            var qualifications = result.dataValues; //the instance of the admin
            res.status(200).send(result);
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

module.exports = router;