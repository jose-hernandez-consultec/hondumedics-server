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

const { sequelize } = require('./models');

app.use(logger('dev'));

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

app.listen(PORT, () => {
  console.log(process.env.ENV);
  console.log(`Server running at: http://localhost:${PORT}/`);
});