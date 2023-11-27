const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const router = express.Router();

var indexRouter = require('./routes/index');
var createBookingsRouter = require('./routes/create-booking');
var viewBookingsRouter = require('./routes/view-booking');
var aboutRouter = require('./routes/about');
var helpRouter = require('./routes/help');


var app = express();

// Set up mongoose connection
// mongoose.set("strictQuery", false);
// const mongoDB = "mongodb+srv://arnas:Mongo@SsProject1.p6ab0sx.mongodb.net/";

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }
mongoose.connect('mongodb://127.0.0.1:27017/booking');
const db = mongoose.connection;
db.on('error', ()=>console.log("something went wrong connecting to db"));
db.once('open',()=>{
  console.log("DB connection successfull")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/home', indexRouter);
app.use('/create-booking', createBookingsRouter);
app.use('/view-booking', viewBookingsRouter);
app.use('/about', aboutRouter);
app.use('/help', helpRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening to localhost:${PORT}`)
});



module.exports = app;
