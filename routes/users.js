var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function (req, res, next) {
  let user = new user(
    {
      name: req.body.name,
      price: req.body.price
    }
  );
  res.send('respond with a resource');
});

module.exports = router;
