const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const server = express();
server.use(bodyParser.json());
const cors = require('cors')
server.use(cors())

// Establish the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbsmemployee', // Replace with your database name for employees
});

db.connect(function (error) {
  if (error) {
    console.log('Error Connecting to DB');
  } else {
    console.log('Successfully Connected to DB');
  }
});

// Establish the Port
server.listen(8085, function check(error) {
  if (error) {
    console.log('Error....!!!!');
  } else {
    console.log('Started....!!!! 8085');
  }
});

// Create the Records
server.post('/api/employee/add', (req, res) => {
  let details = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    empname: req.body.empname,
    designation: req.body.designation,
    rateType: req.body.rateType,
    email: req.body.email,
    phone: req.body.phone,
    hourlyRateSalary: req.body.hourlyRateSalary,
    bloodGroup: req.body.bloodGroup,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    country: req.body.country,
    zipCode: req.body.zipCode,
    city: req.body.city,
  };
  let sql = 'INSERT INTO employee SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Employee creation failed' });
    } else {
      res.send({ status: true, message: 'Employee created successfully' });
    }
  });
});

// View the Records
server.get('/api/employee', (req, res) => {
  var sql = 'SELECT * FROM employee';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error Connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Search the Records
server.get('/api/employee/:id', (req, res) => {
  var employeeid = req.params.id;
  var sql = 'SELECT * FROM employee WHERE id=' + employeeid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error Connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update the Records
server.put('/api/employee/update/:id', (req, res) => {
  let sql =
  "UPDATE employee SET firstName='" +
  req.body.firstName +
  "', lastName='" +
  req.body.lastName +
  "', empname='" +
  req.body.empname +
  "', designation='" +
  req.body.designation +
  "', rateType='" +
  req.body.rateType +
  "', email='" +
  req.body.email +
  "', addressLine1='" +
  req.body.addressLine1 +
  "', phone='" +
  req.body.phone +
  "', hourlyRateSalary='" +
  req.body.hourlyRateSalary +
  "', bloodGroup='" +
  req.body.bloodGroup +
  "', addressLine2='" +
  req.body.addressLine2 +
  "', country='" +
  req.body.country +
  "', zipCode='" +
  req.body.zipCode +
  "', city='" +
  req.body.city +
  "'  WHERE id=" +
  req.params.id;
  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Employee update failed' });
    } else {
      res.send({ status: true, message: 'Employee updated successfully' });
    }
  });
});

// Delete the Records
server.delete('/api/employee/delete/:id', (req, res) => {
  let sql = 'DELETE FROM employee WHERE id=' + req.params.id + '';
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'Employee deletion failed' });
    } else {
      res.send({ status: true, message: 'Employee deleted successfully' });
    }
  });
});
