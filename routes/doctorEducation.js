var express = require('express');
var router = express.Router();

const { DoctorEducation } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        DoctorEducation.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/newDoctorEducation')
    .post((req, res) => {
        console.log(req.body);
        return DoctorEducation.create(
            {
                institute_name: req.body.institute_name,
                degree_obtained: req.body.degree_obtained,
                description: req.body.description,
                location: req.body.location,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                current_education: req.body.current_education,
                doctor_id: req.body.doctor_id,
            },
            { 
                fields: [
                    "institute_name",
                    "degree_obtained",
                    "description", 
                    "location",
                    "start_date",
                    "end_date",
                    "current_education",
                    "doctor_id"
                ] 
            }
        ).then(function (result) {
            console.log(result);
            var education = result.dataValues; //the instance of the admin
            res.status(200).send({added: true, education:education});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/getDoctorEducationByDoctorId')
    .post((req, res) => {
        console.log(req.body);
        //Hash Password first
        return DoctorEducation.findAll(
            {
                where: {
                    doctor_id: req.body.doctor_id
                }
            }
        ).then(function (result) {
            console.log(result);
            var experience = result.dataValues; //the instance of the admin
            res.status(200).send({added:true, experiences:result});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

module.exports = router;