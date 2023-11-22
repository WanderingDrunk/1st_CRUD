var express = require('express');
var router = express.Router();
const booking = require('../models/booking');


/* GET create booking page. */
router.get('/', function(req, res, next) {
  res.render('create-booking')
})



module.exports = router;