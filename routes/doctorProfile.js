var express = require('express');
var router = express.Router();
const cloudinary = require("cloudinary").v2;
const { DoctorProfile } = require('../models');
const { Doctor } = require('../models');


// cloudinary configuration
cloudinary.config({
    cloud_name: "dw5ieofkh",
    api_key: "651924125371581",
    api_secret: "HK4HLaW4WJOLJskGIJgixSrnBSk"
});

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        DoctorProfile.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/getDoctorProfileByDoctorID')
    .post((req, res) => {
        return DoctorProfile.findOne(
            {
                where: {
                    doctor_id: req.body.doctor_id
                }
            }
        ).then(function (result) {
            if (result){

                var doctor_user = Doctor.findOne(
                    {
                        where: {
                            doctor_id: req.body.doctor_id
                        }
                    }
                ).then(function (result2){
                    var doctor_profile = result.dataValues; //the instance of the admin
                    var doctor_user = result2.dataValues
                    var doctor_full = {
                        doctor_id: req.body.doctor_id,
                        profile_picture: doctor_profile.profile_picture,
                        address:doctor_profile.address,
                        description:doctor_profile.description,
                        birthdate:doctor_profile.birthdate,
                        last_name:doctor_profile.last_name,
                        first_name:doctor_profile.first_name,
                        email:doctor_user.email,
                        specialization_name: doctor_profile.specialization_name,
                        specialization_id: doctor_profile.specialization_id
                    }
                    res.status(200).send({exists:true,message:"Found Profile!", doctor_profile:doctor_full});
                });
            } else {
                res.status(403).send({login:false,message:"Unknown Profile!"});
            }
            
        });
    });

router.route('/updateDoctorProfilePictureByDoctorId')
    .post((req, res) => {
        cloudinary.uploader.upload(req.body.profile_picture, function(error,result){
            return DoctorProfile.update(
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

router.route('/updateDoctorProfileByDoctorID')
    .post((req, res) => {
        return DoctorProfile.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                birthdate: req.body.birthdate,
                description: req.body.description,
                specialization_name: req.body.specialization_name,
                specialization_id: req.body.specialization_id
            },
            {
                where: {
                    doctor_id: req.body.doctor_id
                }
            }
        ).then(function (result) {
            if (result){
                var doctor_profile = result.dataValues; //the instance of the admin
                res.status(200).send({updated:true,message:"Profile Updated!", doctor_profile:doctor_profile});
            } else {
                res.status(403).send({login:false,message:"Unknown Profile!"});
            }
            
        });
    });

module.exports = router;