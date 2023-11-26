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
  

  const {name, email, contact_num, ws_date, ws_time, cred_card_name, cred_card_num, cvv, exp_month, exp_day, date_booked} = req.body;

  var bookingmade = new booking({
    name,
    email,
    contact_num, 
    ws_date, 
    ws_time, 
    cred_card_name, 
    cred_card_num, 
    cvv, 
    exp_month, 
    exp_day, 
    date_booked
  });


  bookingmade.save()
  .then(() => {
    // Redirect to the 'view-booking' page after successfully saving the booking
    res.redirect('/view-booking');
  })
  .catch((err) => {
    // Handle the error appropriately
    console.error('Error saving booking:', err);
    next(err); // Pass the error to the error-handling middleware
  });

})

module.exports = router;