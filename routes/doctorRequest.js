var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var nodemailer = require('nodemailer');
const { DoctorRequest } = require('../models');
const { Doctor } = require('../models');
var generator = require('generate-password');
const Op = require('sequelize').Op;

/* GET doctor request listing listing. */
router.route('/')
    .get((req, res) => {
        DoctorRequest.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/newDoctorRequest')
    
    .post((req, res) => {
        //Hash Password first
        //var hashed_password = bcrypt.hashSync(req.body.password, 10);
        console.log(req.body);
        return DoctorRequest.findOrCreate(
            {
                where: {
                    email: req.body.email,
                    phone_number: req.body.phone_number
                },
                defaults: {
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    phone_number: req.body.phone_number,
                    doctor_number: parseInt(req.body.doctor_number),
                    specialty: req.body.specialty,
                    requestApproved: -1
                }
            }
        ).then(function (result) {

            var request = result[0] //the instance of the doctor request
            var created = result[1]; //boolean stating if the admin was created or not

            if (!created){
                res.status(403).send({added:false,message:"The doctor has already requested to join and is pending approval!"});
            } else {
                res.status(200).send({added:true,message:"Doctor Request Successfully created!!", doctor_request:request});
            }
        });
    });

router.route('/approveRequest')
    .post((req, res) => {
        return DoctorRequest.update(
            {
                requestApproved: 1,
            },
            {
                where: {
                    request_id: req.body.request_id
                }
            }
        ).then(function (result) {
            console.log(result);

            var doctors_requests = DoctorRequest.findOne(
                {
                    where: {
                        request_id: req.body.request_id,
                    }
                }
            ).then(function(result2){
                var doctor_request = result2.dataValues;

                var email = doctor_request.email;
                var id = doctor_request.doctor_number;
                var first_name = doctor_request.first_name;
                var last_name = doctor_request.last_name;

                var phone_number = doctor_request.phone_number;
                var specialty = doctor_request.specialty;
                var password = generator.generate({
                    length: 10,
                    numbers: true
                });

                var hashed_password = bcrypt.hashSync(password, 10);

                var newDoctor = Doctor.findOrCreate(
                    {
                        where: {
                            doctor_id: id,
                            email: email
                        },
                        defaults: {
                            doctor_id: id,
                            email: email,
                            first_name: first_name,
                            last_name: last_name,
                            password: hashed_password,
                            first_time_logged_in: 1
                        }
                    }
                ).then(function (result3) {
                    var doctor = result3[0] //the instance of the admin
                    var created = result3[1]; //boolean stating if the admin was created or not
                    if (!created){
                        res.status(403).send({added:false,message:"Patient with email already exists!"});
                    } else {
                        console.log(email);
                        var transporter = nodemailer.createTransport({
                            service: process.env.MAIL_SERVICE,
                            auth: {
                                user: process.env.MAIL_USERNAME,
                                pass: process.env.MAIL_PASSWORD
                            }
                        });

                        if(process.env.ENV === "development"){
                            console.log("New Doctor Added: ");
                            console.log(email);
                            console.log(password);
                            res.status(200).send({added:true,message:"Doctor has been added successfully!", doctorData:doctor});
                        }else{
                            var mailOptions = {
                                from: 'solicitudes@hondumedics.com',
                                to: email,
                                subject: 'Solicitud Hondumedics',
                                text: "Su Solicitud ha sido aprobada! Su usuario es: " + email + " y su contraseña temporal es: "+password
                            }
    
                            transporter.sendMail(mailOptions, function(error,info){
                                if (error) {
                                    console.log(error);
                                }else{
                                    res.status(200).send({added:true,message:"Doctor has been added successfully!", doctorData:doctor});
                                    console.log('Email sent');
                                }
                            });
                        }

                        
                    }
                });

                
            })


        });
    });

router.route('/resetRequests')
    .get((req, res) => {
        return DoctorRequest.update(
            {
                requestApproved: -1,
            },
            {
                where: {
                    requestApproved: {
                        [Op.or]: [0,1]
                    }
                }
            }
            
        ).then(function (result) {
            if(result){
                res.status(200).send({updated:true, message:"Requests has been reset!"});
            }
        });
    });

router.route('/rejectRequest')
    .post((req, res) => {
        return DoctorRequest.update(
            {
                requestApproved: 0,
            },
            {
                where: {
                    request_id: req.body.request_id
                }
            }
        ).then(function (result) {
            if(result){
                res.status(200).send({updated:true, message:"Request Has Been Rejected!"});
            }
        });
    });
module.exports = router;