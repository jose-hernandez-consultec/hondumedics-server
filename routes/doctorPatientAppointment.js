var express = require('express');
var router = express.Router();

const { DoctorPatientAppointment } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        DoctorPatientAppointment.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/newDoctorPatientAppointment')
    .post((req, res) => {
        console.log(req.body);
        //Hash Password first
        return DoctorPatientAppointment.create(
            {
                hospital_id: req.body.hospital_id,
                appointment_date: req.body.appointment_date,
                doctor_id: req.body.doctor_id,
                patient_id: req.body.patient_id
            },
            { 
                fields: [
                    "hospital_id",
                    "appointment_date",
                    "doctor_id", 
                    "patient_id"
                ] 
            }
        ).then(function (result) {
            var appointment = result[0]; //the instance of the admin
            res.status(200).send({ created: true, appointment:appointment});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

module.exports = router;