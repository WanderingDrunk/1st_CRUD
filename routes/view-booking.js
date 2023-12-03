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
      ws_date: new Date(ws_date),
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


  /* POST delete booking. */
router.post('/:id/delete', async (req, res, next) => {
  const bookingId = req.params.id;

  try {
    // Delete the booking by ID
    await booking.findByIdAndDelete(bookingId);

    // Fetch all bookings again after the delete operation
    const updatedBookings = await booking.find({});

    // Render the 'view-booking' page with the updated bookings
    res.render('view-booking', { bookings: updatedBookings });
  } catch (err) {
    console.error('Error deleting booking:', err);
    next(err);
  }
});

  /* GET edit booking page. */
  router.get('/:id/edit', function(req, res, next) {
    const bookingId = req.params.id;

    console.log('Edit route triggered with ID:', bookingId);

    // Fetch the existing booking data based on the ID
    booking.findById(bookingId)
      .then(existingBooking => {
        if (!existingBooking) {
          // If no booking is found with the provided ID, render a 404 page or handle it as needed
          res.status(404).render('404'); 
        }

        res.render('edit-booking', { booking: existingBooking });
      })
      .catch(err => {
        console.error('Error fetching existing booking for edit:', err);
        next(err);
      });
  });

  /* POST update booking. */
router.post('/:id/edit', async (req, res, next) => {
  const bookingId = req.params.id;

  try {
    // Use findByIdAndUpdate to update the booking based on ID
    const updatedBooking = await booking.findByIdAndUpdate(
      bookingId,
      {
        name: req.body.name,
        email: req.body.email,
        contact_num: req.body.contact_num,
        ws_date: req.body.ws_date,
        ws_time: req.body.ws_time,
        cred_card_name: req.body.cred_card_name, 
        cred_card_num: req.body.cred_card_num,
        cvv: req.body.cvv,
        exp_month: req.body.exp_month,
        exp_day: req.body.exp_day,
        date_booked: req.body.date_booked,
      },
      { new: true } // Set { new: true } to return the updated document
    );

    if (!updatedBooking) {
      // If no booking is found with the provided ID, render a 404 page or handle it as needed
      res.status(404).render('404');
      return;
    }


    
    res.redirect('/view-booking');
  } catch (err) {
    console.error('Error updating booking:', err);
    next(err);
  }
});

router.get('/search', async (req, res, next) => {
  const searchName = req.query.name;

  try {
    // Use a regular expression to perform a case-insensitive search by name
    const filteredBookings = await booking.find({ name: { $regex: new RegExp(searchName, 'i') } });

    // Log the ws_date types
    console.log(filteredBookings.map(booking => typeof booking.ws_date));

    // Send the filtered bookings as JSON response
    res.status(200).json({ bookings: filteredBookings });
  } catch (err) {
    console.error('Error searching bookings:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  module.exports = router;