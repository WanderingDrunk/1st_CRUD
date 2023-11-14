var express = require('express');
var router = express.Router();
const booking = require('../models/booking');


/* GET create booking page. */
router.get('/', function(req, res, next) {
  res.render('create-booking')
})

// router.post('/view-booking', (req, res, next)=>{
//   const name = req.body.name;
//   const ws_date = req.body.ws_date;
//   const ws_time = req.body.ws_time;
//   const date_booked = req.body.date_booked;

//   var bookingmade = new booking({
//     name: name,
//     ws_date: ws_date,
//     ws_time: ws_time,
//     date_booked: date_booked
//   });

//   bookingmade.save((err)=>{
//     if(err){
//       console.log("Could not save data to database")
//     }else{
//       console.log("Data recorded succesfully")
//       res.redirect('/view-booking')
//     }
//   })

// });

module.exports = router;