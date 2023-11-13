var express = require('express');
var router = express.Router();
var booking = require('../models/booking')


/* GET create booking page. */
router.get('/', function(req, res, next) {
  res.render('create-booking')
})

router.post('/view-booking', function(req, res, next) {
  var name = req.body.name;
  var ws_date = req.body.ws_date;
  var ws_time = req.body.ws_time;
  var date_booked = req.body.date_booked;
})

module.exports = router;