var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
      type: String,
      required: true,
      maxLength: 100
    },
    email: {
      type: String,
      required: true
    },
    contact_num: {
      type: String,
      required: true
    },
    ws_date: {
      type: Date,
      required: true
    },
    ws_time: {
      type: String,
      required: true,
      enum: ["12:00", "15:00", "18:00"],
      default: "12:00",
    },
    cred_card_name: {
      type: String,
      required: true
    },
    cred_card_num: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    },
    exp_month: {
      type: String,
      required: true
    },
    exp_day: {
      type: String,
      required: true
    },
    date_booked: {
      type: Date,
      default: Date.now
    },
    
  });


  module.exports = mongoose.model('booking', userSchema);