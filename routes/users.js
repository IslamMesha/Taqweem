var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');

// Create a new user.
router.post('/create', function (req, res, next) {
  console.log('Create a new user.');
  let newUser = new userModel(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: req.body.avatar,
    }
  );
  newUser.save(function (err, newUser, numAffected) {

    if (!err) {
      console.log('User created successfully: ', newUser);
      res.sendStatus(200);
    } else {
      console.log("Error in creating user: ", err);
      res.sendStatus(500);
    }
    return newUser
  });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('GET users listing.');
});

// Update user by id.
router.put('/update:id', function (req, res, next) {
  res.send('respond with a resource');
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
