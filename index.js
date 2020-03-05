require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//var index = require('./routes/index');
const users = require('./routes/users');
const admins = require('./routes/admins');
const posts = require('./routes/posts');
const patients = require('./routes/patients');
const doctor_requests = require('./routes/doctorRequest');
const doctors = require('./routes/doctors');

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
app.use('/users', users);
app.use('/admins', admins);
app.use('/posts', posts);
app.use('/patients', patients);
app.use('/doctorRequests', doctor_requests)
app.use('/doctors', doctors)

app.listen(PORT, () => {
  console.log(process.env.ENV);
  console.log(`Server running at: http://localhost:${PORT}/`);
});