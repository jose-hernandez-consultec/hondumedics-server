var express = require('express');
var router = express.Router();

const { Specialization } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        Specialization.findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/newSpecialization')
    .post((req, res) => {
        console.log(req.body);
        return Specialization.create(
            {
                specialization_name: req.body.specialization_name
            },
            { 
                fields: [
                    "specialization_name"
                ] 
            }
        ).then(function (result) {
            console.log(result);
            var specialization = result.dataValues; //the instance of the admin
            res.status(200).send({added: true, specialization:specialization});
        }).error(function (error){
            res.status(500).send({created:false, message:"A server error occured!"});
        });
    });

router.route('/deleteSpecializationById')
    .post((req, res) => {
        console.log(req.body);
        return Specialization.destroy(
            {
                where: {
                    specialization_id: req.body.specialization_id
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

router.route('/updateSpecializationInformation')
    .post((req, res) => {
        return Specialization.update(
            {
                specialization_name: req.body.specialization_name,
                
            },
            {
                where: {
                    specialization_id: req.body.specialization_id
                }
            }
        ).then(function (result) {
            if (result){
                var specialization = result.dataValues; //the instance of the admin
                res.status(200).send({updated:true,message:"Specialization Updated!", specialization:specialization});
            } else {
                res.status(403).send({login:false,message:"Unknown!"});
            }
            
        });
    });

router.route('/getSpecializationInfoById')
    .post((req, res) => {
        return Specialization.findOne(
            {
                where: {
                    specialization_id: req.body.specialization_id
                }
            }
        ).then(function (result) {
            if (result){
                var specialization = result.dataValues; //the instance of the admin
                res.status(200).send({found:true, specialization:specialization});
            } else {
                res.status(403).send({found:false,message:"Unknown!"});
            }
            
        });
    });

module.exports = router;