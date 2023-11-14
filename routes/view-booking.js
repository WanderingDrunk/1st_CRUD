var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var booking = require('../models/booking');


/* GET create booking page. */
router.get('/', function(req, res, next) {
  booking.find({booking}).then((docs) =>{
    console.log('Documents Found:');
    console.log(docs);
    res.render('view-booking',{bookings: docs});
  });
 
});
router.post('/', (req, res, next)=>{
  const name = req.body.name;
  const ws_date = req.body.ws_date;
  const ws_time = req.body.ws_time;
  const date_booked = req.body.date_booked;

  var bookingmade = new booking({
    name: name,
    ws_date: ws_date,
    ws_time: ws_time,
    date_booked: date_booked
  });

  bookingmade.save();

})

module.exports = router;