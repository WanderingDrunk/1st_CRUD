var express = require('express');
var router = express.Router();
var booking = require('../models/booking')


/* GET create booking page. */
router.get('/', function(req, res, next) {
  booking.find((err, docs)=>{
    res.render('view-booking',{bookings: docs});
  }).catch((err)=>{
    console.log("Something Wrong with mongodb cant retrieve")
  })
})

module.exports = router;