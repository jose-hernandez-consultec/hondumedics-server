var express = require('express');
var router = express.Router();

const { DoctorExperience } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        DoctorExperience.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/newDoctorExperience')
    .post((req, res) => {
        console.log(req.body);
        //Hash Password first
        return DoctorExperience.create(
            {
                company_name: req.body.company_name,
                job_title: req.body.job_title,
                description: req.body.description,
                location: req.body.location,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                current_job: req.body.current_job,
                doctor_id: req.body.doctor_id,
            },
            { 
                fields: [
                    "company_name",
                    "job_title",
                    "description", 
                    "location",
                    "start_date",
                    "end_date",
                    "current_job",
                    "doctor_id"
                ] 
            }
        ).then(function (result) {
            console.log(result);
            var experience = result.dataValues; //the instance of the admin
            res.status(200).send({ created: true, experience:experience});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/getDoctorExperienceByDoctorId')
    .post((req, res) => {
        console.log(req.body);
        //Hash Password first
        return DoctorExperience.findAll(
            {
                where: {
                    doctor_id: req.body.doctor_id
                }
            }
        ).then(function (result) {
            console.log(result);
            var experience = result.dataValues; //the instance of the admin
            res.status(200).send({experiences:result});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

module.exports = router;