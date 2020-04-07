var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { Admin } = require('../models');


const winston = require('../winston');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

var currentdate = new Date(); 
var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

/* Archivo de rutas y procedimientos almacenados para la tabla admins 
    En este archivo se establecen las rutas HTTP para establecer la conexion cliente-servidor entre el cliente (la aplicacion web)
    y la base de datos con la tabla Admin
*/

/* Metodo GET HTTP que muestra el listado de todos los usuarios administradores */
router.route('/')
    .get((req, res) => {
        Admin.findAll({ attributes: { exclude: ['password'] } }) //se excluye de mostrar las contraseñas
            .then(function(data){
 
                winston.info(`${today} ${datetime} - Obteniendo el listado de todos los usuarios administradores`);
                res.status(200).send(data);

            })
            .catch(err => res.status(500).send(err))
    });

 /* Metodo POST HTTP, muestra un administrador de acuerdo al identificador recibido como parametro enviado desde el cliente */
router.route('/getAdminByid')
    .post((req, res) => {
        return Admin.findOne(
            {
                attributes: {
                    exclude: ['password'] //se excluye de mostrar las contraseñas
                }
            },
            {
                where: {
                    admin_id: req.body.admin_id //condicion WHERE, aca se indica que muestre solamente el administrador equivalente al id enviado
                }
            }
        ).then(function (result) {
            console.log(result);
            if (result){
                var admin = result.dataValues; //the instance of the admin
                res.status(200).send({ found: true, admin: admin }); //respuesta enviada al cliente enviando la informacion del administrador encontrado
                
                winston.info(`${today} ${datetime} - Administrador con admin_id: ${req.body.admin_id} encontrado!`);

            } else {
                winston.info(`${today} ${datetime} - ERROR! Administrador con admin_id: ${req.body.admin_id} no fue encontrado!`);

                res.status(403).send({login:false,message:"Unknown user!"}); //error enviado al cliente
            }
            
        });
    });

/* Metodo POST HTTP, hace login de administradores  */

router.route('/adminLogin')
    .post((req, res) => {
        return Admin.findOne(
            {
                where: {
                    email: req.body.email //condicion WHERE, aca se indica que muestre solamente el administrador equivalente al email enviado
                }
            }
        ).then(function (result) {
            console.log(result);
            if (result){
                var admin = result.dataValues; //la instancia encontrada del administrador
                var password = admin.password; //agarramos la contraseña encriptada

                admin = {
                    "admin_id": admin.admin_id,
                    "username":admin.username,
                    "first_name":admin.first_name,
                    "last_name":admin.last_name,
                    "email":admin.email,
                    "access":admin.access
                };

                if(bcrypt.compareSync(req.body.password, password)){ //se compara con bcrypt si la contranseña encriptada es igual a la ingresada
                    var token = jwt.sign({ admin_id: admin.admin_id }, process.env.SECRET_KEY, {expiresIn: 86400}); //se genera un json web token

                    winston.info(`${today} ${datetime} - Administrador con admin_id: ${req.body.admin_id} ha iniciado sesion de manera exitosa!`);
                    res.status(200).send({ auth: true, token: token, admin: admin });
                    //res.status(200).send({login:true,message:"Admin successfully logged in!", admin:admin});
                }else{
                    winston.info(`${today} ${datetime} - ERROR! La contraseña del administrador con admin_id: ${req.body.admin_id} no fue la correcta!`);
                    res.status(403).send({login:false,message:"Incorrect Password!"}); //enviar mensaje de error al cliente de contraseña incorrecta
                }
            } else {


                winston.info(`${today} ${datetime} - ERROR! administrador con admin_id: ${req.body.admin_id} no fue encontrado!`);
                res.status(403).send({login:false,message:"Unknown user!"}); //enviar mensaje de error al cliente de usuario desconocido

            }
            
        });
    });

/* Metodo POST HTTP, agrega un nuevo administrador */
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
            var admin = result[0] //la instancia del administrador agregado
            var created = result[1]; //booleano para verificar si se hizo el insert a la base de datos
            if (!created){
                res.status(403).send({added:false, message:"Admin with email already exists!"});
            } else {

                var token = jwt.sign({ admin_id: admin.admin_id }, process.env.SECRET_KEY, {expiresIn: 86400});
                res.status(200).send({ auth: true, token: token, admin: admin });
            }
        }).error(function (error){
            res.status(500).send({added:false, message:"A server error occured!"});

        });
    });

/* Metodo POST HTTP, editar un administrador */
router.route('/editAdmin')
    .post((req, res) => {
        console.log(req.body);
        return Admin.update(
            {
                /*propiedades a actualizar, enviadas desde el cliente */
                username: req.body.username, 
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                access: req.body.access
            },
            {
                where: {
                    admin_id: req.body.admin_id //condicion where, para obtener el administrador correspondiente de acuerdo al identificador
                }
            }
        ).then(function (result) {
            if(result){
                res.status(200).send({updated:true,message:"Admin updated!"}); //respuesta enviada al cliente luego de actualizar
            }
        });
    });



module.exports = router;