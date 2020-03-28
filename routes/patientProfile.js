var express = require('express');
const cloudinary = require("cloudinary").v2;
var router = express.Router();

const { PatientProfile } = require('../models');


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
                var patient_profile = result.dataValues; //the instance of the admin
                res.status(200).send({exists:true,message:"Found Profile!", patient_profile:patient_profile});
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