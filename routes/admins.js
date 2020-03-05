var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

const { Admin } = require('../models');

/* GET admin listing. */

router.route('/')
    .get((req, res) => {
        Admin.findAll({ attributes: { exclude: ['password'] } })
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    });

router.route('/adminLogin')
    .post((req, res) => {
        console.log(req.body.email);
        return Admin.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        ).then(function (result) {
            console.log(result);
            if (result){
                var admin = result.dataValues; //the instance of the admin
                var password = admin.password; //boolean stating if the admin was created or not
                //Check if passwords match

                admin = {
                    "admin_id": admin.admin_id,
                    "username":admin.username,
                    "first_name":admin.first_name,
                    "last_name":admin.last_name,
                    "email":admin.email,
                    "access":admin.access
                };

                if(bcrypt.compareSync(req.body.password, password)){
                    res.status(200).send({login:true,message:"Admin successfully logged in!", admin:admin});
                }else{
                    res.status(403).send({login:false,message:"Incorrect Password!"});
                }
            } else {
                res.status(403).send({login:false,message:"Unknown user!"});
            }
            
        });
    });

router.route('/addNewAdmin')
    .post((req, res) => {
        //Hash Password first
        var hashed_password = bcrypt.hashSync(req.body.password, 10);
        return Admin.findOrCreate(
            {
                where: {
                    email: req.body.email
                },
                defaults: {
                    username: req.body.username,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashed_password,
                    access: req.body.access
                }
            }
        ).then(function (result) {

            var admin = result[0] //the instance of the admin
            var created = result[1]; //boolean stating if the admin was created or not

            if (!created){
                res.status(403).send({added:false,message:"Admin with email already exists!"});
            } else {
                res.status(200).send({added:true,message:"Admin has been added successfully!", admin:admin});
            }
        });
    });

router.route('/editAdmin')
    .post((req, res) => {
        console.log(req.body);
        return Admin.update(
            {
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                access: req.body.access
            },
            {
                where: {
                    admin_id: req.body.admin_id
                }
            }
        ).then(function (result) {
            if(result){
                res.status(200).send({updated:true,message:"Admin updated!"});
            }
        });
    });

router.route('/deleteAdmin')
    .post((req, res) => {
        console.log(req.body);
        return Admin.destroy(
            {
                where: {
                    admin_id: req.body.admin_id
                }
            }
        ).then(function (rowDeleted) {
            if(rowDeleted === 1){
                res.status(200).send({deleted:true,message:"Admin deleted!", rowsDeleted:rowDeleted});
            }
        }).error(function (error){
            res.status(500).send({deleted:false,message:"An error has occured!"});
        });
    });

module.exports = router;