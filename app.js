var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

const flash = require('connect-flash');


//for dot env
var dotenv = require('dotenv');
dotenv.config();

//dot env file has a key called MongoURI with the Mongo Atlas Key
var mongo_key = process.env.MongoURI;



//load for routes later below
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');

var userpageRouter = require('./routes/userpage')


const suggestionsRouter = require('./routes/suggestions');



const mongoose = require('mongoose');

const passport = require('passport');


const { fileLoader } = require('ejs');
const { writeHeapSnapshot } = require('v8');



var app = express();


// Passport Config plus we pass passport from here to config
require('./config/passport')(passport);

//databasekey
const db = mongo_key;


//connection to atlas using mongoose for simplicity using documentation 
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo Atlas Connected"))
  .catch(err => console.log(err));


//Bodyparser
app.use(express.urlencoded({ extended: false }))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));







// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/userpage', userpageRouter);


app.use('/suggestions', suggestionsRouter);




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

module.exports = app;
