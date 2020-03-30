var express = require('express');
const cloudinary = require("cloudinary").v2;
var router = express.Router();

const { PatientProfile } = require('../models');
const { Patient } = require('../models');

// cloudinary configuration
cloudinary.config({
    cloud_name: "dw5ieofkh",
    api_key: "651924125371581",
    api_secret: "HK4HLaW4WJOLJskGIJgixSrnBSk"
});


router.route('/')
    .get((req, res) => {
        PatientProfile.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });


router.route('/getPatientProfileByPatientID')
    .post((req, res) => {
        return PatientProfile.findOne(
            {
                where: {
                    patient_id: req.body.patient_id
                }
            }
        ).then(function (result) {
            if (result){
                var patient_user = Patient.findOne(
                    {
                        where: {
                            patient_id: req.body.patient_id
                        }
                    }
                ).then(function (result2){
                    var patient_profile = result.dataValues; //the instance of the admin
                    var email = result2.dataValues.email
                    //var patient_user2 = result2.dataValues;

                    console.log("INSIDE");
                    console.log(result2);

                    var patient_full = {
                        email: email,
                        patient_id: req.body.patient_id,
                        first_name: patient_profile.first_name,
                        last_name: patient_profile.last_name,
                        profile_picture: patient_profile.profile_picture,
                        home_address: patient_profile.home_address,
                        birthdate: patient_profile.birthdate,
                        work_address: patient_profile.work_address,
                        blood_type: patient_profile.blood_type,
                        gender: patient_profile.gender,
                        phone_number: patient_profile.phone_number
                        
                    }
                    res.status(200).send({exists:true,message:"Found Profile!", patient_profile:patient_full});
                });
            } else {
                res.status(403).send({login:false,message:"Unknown Profile!"});
            }
            
        });
    });

    router.route('/updatePatientProfilePictureByPatientId')
    .post((req, res) => {
        cloudinary.uploader.upload(req.body.profile_picture, function(error,result){
            return PatientProfile.update(
                {
                    profile_picture: result.secure_url
                },
                {
                    where: {
                        doctor_id: req.body.doctor_id
                    }
                }
            ).then(function (result2) {
                if (result2){
                    var doctor_profile = result2.dataValues; //the instance of the admin
                    res.status(200).send({updated:true,message:"Profile Picture Updated!",image: result.secure_url});
                } else {
                    res.status(403).send({login:false,message:"Unknown Profile!"});
                }
            });
        });
    });

    router.route('/updatePatientProfileByPatiendID')
    .post((req, res) => {
        return PatientProfile.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                home_address: req.body.home_address,
                birthdate: req.body.birthdate,
                work_address: req.body.work_address,
                blood_type: req.body.blood_type,
                phone_number: req.body.phone_number
            },
            {
                where: {
                    patient_id: req.body.patient_id
                }
            }
        ).then(function (result) {
            if (result){
                var patient_profile = result.dataValues; //the instance of the admin
                res.status(200).send({updated:true,message:"Profile Updated!", patient_profile:patient_profile});
            } else {
                res.status(403).send({login:false,message:"Unknown Profile!"});
            }
            
        });
    });

module.exports = router;