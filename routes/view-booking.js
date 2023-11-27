var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var booking = require('../models/booking');

/* GET create booking page. */
router.get('/', function(req, res, next) {
  booking.find({}).then((docs) => {
    console.log('Documents Found:');
    console.log(docs);
    res.render('view-booking', { bookings: docs });
  });
});

/* POST create booking. */
router.post('/', (req, res, next) => {
  const { name, email, contact_num, ws_date, ws_time, cred_card_name, cred_card_num, cvv, exp_month, exp_day, date_booked } = req.body;

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
});

/* GET edit booking page. */
/* POST update booking. */
router.post('/:id/edit', (req, res, next) => {
  const bookingId = req.params.id;

  // Fetch the existing booking data based on the ID
  booking.findById(bookingId)
    .then(existingBooking => {
      if (!existingBooking) {
        // If no booking is found with the provided ID, render a 404 page or handle it as needed
        res.status(404).render('404'); // Assuming you have a '404' template
        return;
      }

      // Update the existing booking with the new data
      existingBooking.name = req.body.name;
      existingBooking.email = req.body.email;
      existingBooking.email = req.body.email;
      existingBooking.contact_num = req.body.contact_num;
      existingBooking.ws_date = req.body.ws_date;
      existingBooking.ws_time = req.body.ws_time;
      existingBooking.cred_card_num = req.body.cred_card_num;
      existingBooking.cvv = req.body.cvv;   
      existingBooking.exp_month = req.body.exp_month;
      existingBooking.exp_day = req.body.exp_day;
      existingBooking.date_booked = req.body.date_booked;



      // Save the updated booking
      existingBooking.save()
        .then(() => {
          // Delete the previous booking
          booking.findByIdAndDelete(bookingId)
            .then(() => {
              // Redirect to the 'view-booking' page after successfully updating and deleting the booking
              res.redirect('/view-booking');
            })
            .catch(err => {
              console.error('Error deleting previous booking:', err);
              next(err);
            });
        })
        .catch(err => {
          console.error('Error updating booking:', err);
          next(err);
        });
    })
    .catch(err => {
      console.error('Error fetching existing booking for update:', err);
      next(err);
    });
});

module.exports = router;