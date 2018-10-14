const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User')
const userModel = mongoose.model(User);
const bodyParser = require('body-parser')


router.post('/create', function (req, res, next) {
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
