require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//var index = require('./routes/index');
const admins = require('./routes/admins');
const patients = require('./routes/patients');
const patient_profile = require('./routes/patientProfile');
const doctor_requests = require('./routes/doctorRequest');
const doctors = require('./routes/doctors');
const doctor_profile = require('./routes/doctorProfile')

const { sequelize } = require('./models');

app.use(logger('dev'));

//Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT;

/** Connect and config Database */
sequelize.sync()
  .then(() => console.log('PostgresSQL is sync'))
  .catch(err => console.log(err));

//app.use('/', index);
app.use('/admins', admins);
app.use('/patients', patients);

app.use('/doctorRequests', doctor_requests);
app.use('/doctors', doctors);
app.use('/doctorProfile', doctor_profile);
app.use('/doctorProfile', doctor_profile);

app.listen(PORT, () => {
  console.log(process.env.ENV);
  console.log(`Server running at: http://localhost:${PORT}/`);
});