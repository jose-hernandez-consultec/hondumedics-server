require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//var index = require('./routes/index');
const admins = require('./routes/admins');
const patients = require('./routes/patients');
const patient_profiles = require('./routes/patientProfile');
const doctor_requests = require('./routes/doctorRequest');
const doctors = require('./routes/doctors');
const doctor_profile = require('./routes/doctorProfile');
const doctor_patient_appointment = require('./routes/doctorPatientAppointment');
const doctor_experience = require('./routes/doctorExperience');
const doctor_education = require('./routes/doctorEducation');
const appointments = require('./routes/doctorPatientAppointment');
const hospitals = require('./routes/hospitals');

const specializations = require('./routes/specialization');

const qualification = require('./routes/qualification');
const { sequelize } = require('./models');

const winston = require('./winston');

app.use(logger('combined', { stream: winston.stream }));

//app.use(logger('dev'));

//Parse incoming requests data
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

const PORT = process.env.PORT;

/** Connect and config Database */
sequelize.sync()
  .then(() => console.log('PostgresSQL is sync'))
  .catch(err => console.log(err));

//app.use('/', index);
app.use('/admins', admins);
app.use('/patients', patients);
app.use('/patientProfiles', patient_profiles);
app.use('/doctorRequests', doctor_requests);
app.use('/doctors', doctors);
app.use('/doctorProfiles', doctor_profile);
app.use('/doctorPatientAppointment', doctor_patient_appointment);
app.use("/doctorExperience", doctor_experience);
app.use("/doctorEducation", doctor_education);
app.use("/appointments", appointments);
app.use("/qualification", qualification);
app.use("/hospitals", hospitals);
app.use("/specializations", specializations);


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

var currentdate = new Date(); 
var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();


app.listen(PORT, () => {

	winston.info(`${today} ${datetime} - Iniciando servidor en: http://localhost:${PORT}/`);
  	console.log(process.env.ENV);
  	console.log(`Server running at: http://localhost:${PORT}/`);
});