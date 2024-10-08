var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const date = new Date();



let bookingSchema = new Schema({
    name: {
      type: String,
      required: true,
      maxLength: 100
    },
    email: {
      type: String,
      required: false,
    },
    contact_num: {
      type: String,
      required: false,
    },
    ws_date: {
      type: Date,
      required: true,
    },
    ws_time: {
      type: String,
      required: true,
      enum: ["12:00", "15:00", "18:00"],
      default: "12:00",
    },
    cred_card_name: {
      type: String,
      required: false,
    },
    cred_card_num: {
      type: Number,
      required: false,
    },
    cvv: {
      type: Number,
      required: false,
    },
    exp_month: {
      type: Number,
      required: false,
    },
    exp_day: {
      type: Number,
      required: false,
    },
    date_booked: {
      type: Date,
      default: Date.now
    },
    
  });


  module.exports = mongoose.model('booking', bookingSchema);