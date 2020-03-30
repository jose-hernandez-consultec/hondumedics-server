var express = require('express');
var router = express.Router();

const { Hospital } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        Hospital.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/newHospital')
    .post((req, res) => {
        console.log(req.body);
        return Hospital.create(
            {
                hospital_name: req.body.hospital_name,
                city:req.body.city,
                department:req.body.department,
                directions:req.body.directions,
                country:req.body.country,
            },
            { 
                fields: [
                    "hospital_name",
                    "city",
                    "department", 
                    "directions",
                    "country"
                ] 
            }
        ).then(function (result) {
            console.log(result);
            var hospital = result.dataValues; //the instance of the admin
            res.status(200).send({added: true, hospital:hospital});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/deleteHospitalById')
    .post((req, res) => {
        console.log(req.body);
        return Hospital.destroy(
            {
                where: {
                    hospital_id: req.body.hospital_id
                }
            }
        ).then(function (rowDeleted) {
            if(rowDeleted === 1){
                res.status(200).send({deleted:true});
            }
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/updateHospitalInformation')
    .post((req, res) => {
        return Hospital.update(
            {
                hospital_name: req.body.hospital_name,
                city:req.body.city,
                department:req.body.department,
                directions:req.body.directions,
                country:req.body.country,
            },
            {
                where: {
                    hospital_id: req.body.hospital_id
                }
            }
        ).then(function (result) {
            if (result){
                var hospital = result.dataValues; //the instance of the admin
                res.status(200).send({updated:true,message:"Hospital Updated!", hospital:hospital});
            } else {
                res.status(403).send({login:false,message:"Unknown Profile!"});
            }
            
        });
    });

    router.route('/getHospitalInfoById')
    .post((req, res) => {
        return Hospital.findOne(
            {
                where: {
                    hospital_id: req.body.hospital_id
                }
            }
        ).then(function (result) {
            if (result){
                var hospital = result.dataValues; //the instance of the admin
                res.status(200).send({found:true, hospital:hospital});
            } else {
                res.status(403).send({login:false,message:"Unknown!"});
            }
            
        });
    });

 module.exports = router;