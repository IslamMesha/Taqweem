const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/User')
mongoose.connect('mongodb://localhost/Tqweem');
const db = mongoose.connection;
const bodyParser = require('body-parser')


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("connected successfully.");
});

router.post('/create', function (req, res, next) {
  console.log('Create a new user');
  let newUser = new userModel(
    {
      _id: mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: req.body.avatar,
    }
  );
  newUser.save(function (err, newUser, numAffected) {
    if (err) { }
  });
  res.send('respond with a resource');
});


/* GET users listing. */
router.get('/users', function (req, res, next) {
    res.send('respond with a resource');
});


router.put('/update:id', function (req, res, next) {
  res.send('respond with a resource');
});


router.delete('/delete:id', function (req, res, next) {
  let user = new user(
    {
      name: req.body.name,
      price: req.body.price
    }
  );
  res.send('respond with a resource');
});

module.exports = router;
