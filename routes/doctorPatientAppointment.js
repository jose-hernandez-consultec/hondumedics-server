var express = require('express');
var router = express.Router();

const { DoctorPatientAppointment } = require('../models');
const { PatientProfile } = require('../models');


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
                hospital_name: req.body.hospital_name,
                appointment_date: req.body.appointment_date,
                doctor_id: req.body.doctor_id,
                doctor_name: req.body.doctor_name,
                doctor_picture: req.body.doctor_picture,
                patient_id: req.body.patient_id,
                patient_name: req.body.patient_name,
                patient_picture: req.body.patient_picture,
                patient_email: req.body.patient_email,
                patient_number: req.body.patient_number,
                approved: -1
            },
            { 
                fields: [
                    "hospital_id",
                    "appointment_date",
                    "approved",
                    "doctor_id",
                    "doctor_name",
                    "doctor_picture", 
                    "patient_id",
                    "hospital_name",
                    "patient_name",
                    "patient_picture",
                    "patient_email",
                    "patient_number"                
                ] 
            }
        ).then(function (result) {
            var appointment = result[0]; //the instance of the admin
            console.log("this is result");
            console.log(result);
            res.status(200).send({created: true, appointment:appointment});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/getAllAppointmentsByDoctorId')
    .post((req, res) => {
        console.log(req.body);
        //Hash Password first
        return DoctorPatientAppointment.findAll(
            {
                where: {
                    doctor_id: req.body.doctor_id
                }
            }
        ).then(function (appointments) {
            res.status(200).send(appointments);
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/getAllPendingForApprovalAppointmentsByDoctorId')
    .post((req, res) => {
        console.log(req.body);
        //Hash Password first
        return DoctorPatientAppointment.findAll(
            {
                where: {
                    doctor_id: req.body.doctor_id,
                    approved: -1
                }
            }
        ).then(function (appointments) {
            res.status(200).send(appointments);
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/getAllApprovedAppointmentsByDoctorId')
    .post((req, res) => {
        console.log(req.body);
        //Hash Password first
        return DoctorPatientAppointment.findAll(
            {
                where: {
                    doctor_id: req.body.doctor_id,
                    approved: 1
                }
            }
        ).then(function (appointments) {
            res.status(200).send(appointments);
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/getAllRejectedAppointmentsByDoctorId')
    .post((req, res) => {
        console.log(req.body);
        //Hash Password first
        return DoctorPatientAppointment.findAll(
            {
                where: {
                    doctor_id: req.body.doctor_id,
                    approved: 0
                }
            }
        ).then(function (appointments) {
            res.status(200).send(appointments);
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/approveAppointment')
    .post((req, res) => {
        return DoctorPatientAppointment.update(
            {
                approved: 1,
            },
            {
                where: {
                    appointment_id: req.body.appointment_id
                }
            }
            
        ).then(function (result) {
            if(result){
                res.status(200).send({approved:true, message:"Appointment approved!"});
            }
        });
    });

router.route('/rejectAppointment')
    .post((req, res) => {
        return DoctorPatientAppointment.update(
            {
                approved: 0,
            },
            {
                where: {
                    appointment_id: req.body.appointment_id
                }
            }
            
        ).then(function (result) {
            if(result){
                res.status(200).send({approved:false, message:"Appointment rejected!"});
            }
        });
    });




module.exports = router;