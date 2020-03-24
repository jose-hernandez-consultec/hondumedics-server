var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

const { Doctor } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        Doctor.findAll({ attributes: { exclude: ['password'] } })
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/doctorLogin')
    .post((req, res) => {
        console.log(req.body.email);
        return Doctor.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        ).then(function (result) {
            console.log(result);
            if (result){
                var doctor = result.dataValues; //the instance of the admin
                var password = doctor.password; //boolean stating if the admin was created or not
                //Check if passwords match

                var doctorData = {
                    "doctor_id": doctor.doctor_id,
                    "email":doctor.email,
                    "first_name":doctor.first_name,
                    "last_name":doctor.last_name,
                    "first_time_logged_in":doctor.first_time_logged_in
                };

                if(bcrypt.compareSync(req.body.password, password)){
                    res.status(200).send({login:true,message:"Doctor successfully logged in!", doctor:doctorData});
                }else{
                    res.status(403).send({login:false,message:"Incorrect Password!"});
                }
            } else {
                res.status(403).send({login:false,message:"Unknown user!"});
            }
            
        });
    });

    router.route('/updateDoctorPassword')
    .post((req, res) => {
        return Doctor.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        ).then(function (result) {
            console.log(result);
            if (result){
                var new_password = bcrypt.hashSync(req.body.password, 10);

                var update = Doctor.update(
                    {
                        password: new_password,
                        first_time_logged_in: 0
                    },
                    {
                        where: {
                            email: req.body.email
                        }
                    }
                ).then(function (result2) {
                    console.log(result2);
                    if (result2){
                        res.status(200).send({updated:true,message:"Password Updated!"});
                    }
                });
                
            } else {
                res.status(403).send({message:"Server Error"});
            }
            
        });
    });

module.exports = router;