const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

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

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://arnas:Mongo@ssproject1.p6ab0sx.mongodb.net/";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', indexRouter);
app.use('/create-booking', createBookingsRouter);
app.use('/view-booking', viewBookingsRouter);
app.use('/about', aboutRouter);
app.use('/help', helpRouter);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
})

module.exports = app;
