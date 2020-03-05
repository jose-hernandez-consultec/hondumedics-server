var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

const { Patient } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        Patient.findAll({ attributes: { exclude: ['password'] } })
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/patientLogin')
    .post((req, res) => {
        console.log(req.body.email);
        return Patient.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        ).then(function (result) {
            console.log(result);
            if (result){
                var patient = result.dataValues; //the instance of the admin
                var password = patient.password; //boolean stating if the admin was created or not
                //Check if passwords match

                patient = {
                    "patient_id": patient.patient_id,
                    "email":patient.email,
                    "first_name":patient.first_name,
                    "last_name":patient.last_name,
                    "birthdate":patient.birthdate
                };

                if(bcrypt.compareSync(req.body.password, password)){
                    res.status(200).send({login:true,message:"Patient successfully logged in!", patient:patient});
                }else{
                    res.status(403).send({login:false,message:"Incorrect Password!"});
                }
            } else {
                res.status(403).send({login:false,message:"Unknown user!"});
            }
            
        });
    });

router.route('/addNewPatient')
    .post((req, res) => {
        //Hash Password first
        var hashed_password = bcrypt.hashSync(req.body.password, 10);
        return Patient.findOrCreate(
            {
                where: {
                    email: req.body.email
                },
                defaults: {
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    birthdate: req.body.birthdate,
                    gender: req.body.gender,
                    tos_approved: req.body.tos_approved,
                    password: hashed_password,
                }
            }
        ).then(function (result) {

            var patient = result[0] //the instance of the admin
            var created = result[1]; //boolean stating if the admin was created or not

            if (!created){
                res.status(403).send({added:false,message:"Patient with email already exists!"});
            } else {
                res.status(200).send({added:true,message:"Patient has been added successfully!", patient:patient});
            }
        });
    });

router.route('/editPatient')
    .post((req, res) => {
        console.log(req.body);
        return Patient.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                access: req.body.access
            },
            {
                where: {
                    patient_id: req.body.patient_id
                }
            }
        ).then(function (result) {
            if(result){
                res.status(200).send({updated:true,message:"Patient updated!"});
            }
        });
    });

router.route('/deletePatient')
    .post((req, res) => {
        console.log(req.body);
        return Patient.destroy(
            {
                where: {
                    patient_id: req.body.patient_id
                }
            }
        ).then(function (rowDeleted) {
            if(rowDeleted === 1){
                res.status(200).send({deleted:true,message:"Patient deleted!", rowsDeleted:rowDeleted});
            }
        }).error(function (error){
            res.status(500).send({deleted:false,message:"An error has occured!"});
        });
    });

module.exports = router;