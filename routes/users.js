var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');
var mongoose = require('mongoose');

// Create a new user.
router.post('/create', function (req, res, next) {
  console.log('Create a new user.');
  let newUser = new userModel(
    {
      _id: new mongoose.Types.ObjectId,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // avatar: req.body.avatar,
    }
  );
  newUser.save(function (err, newUser, numAffected) {

    if (!err) {
      console.log('User created successfully: ', newUser);
      // res.sendStatus(200);
      res.send(newUser);
    } else {
      console.log("Error in creating user: ", err);
      res.sendStatus(500);
    }
  });
});

// Get users listing.
router.get('/', function (req, res, next) {
  console.log('GET users listing.');
  userModel.find({}, (err, users) => {
    if (!err) {
      console.log('User list: ', users);
      // res.sendStatus(200);
      res.send(users);
    } else {
      console.log("Error in retreiving users: ", err);
      res.sendStatus(500);
    }
  });
});

// Get user by id.
router.get('/:id', function (req, res, next) {
  console.log('Get user by id.');
  userModel.findById(req.params.id, (err, user) => {
    if (!err) {
      console.log('Get user by id: ', user);
      res.send(user);
    } else {
      console.log("Error in retreiving user: ", err);
      res.sendStatus(500);
    }
  });
});

// Update user by id.
router.put('/update:id', function (req, res, next) {
  console.log('Update user by id');
  userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, updatedUser) => {
    if (!err) {
      console.log('User updated successfully: ', updatedUser);
      // res.sendStatus(200);
      res.send(updatedUser);
    } else {
      console.log("Error in retreiving users: ", err);
      res.sendStatus(500);
    }
  });
});

// Delete user by id.
router.delete('/delete:id', function (req, res, next) {
  let userModel = new user(
    {
      name: req.body.name,
      price: req.body.price
    }
  );
  res.send('respond with a resource');
});

module.exports = router;
