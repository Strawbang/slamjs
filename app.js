var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/slamjs'; 
mongoose.connect(mongoDB);
var dba = mongoose.connection;
dba.on('error', console.error.bind(console, 'MongoDB connection error:'));

var index = require('./routes/index');
var figurants = require ('./routes/figurants')
var android = require('./routes/android');
var insertFigurant = require('./routes/insertFigurant');
var evenements = require('./routes/evenements');
var insertEvenement = require('./routes/insertEvenement');
var role = require('./routes/role');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(function(req,res,next){
//    req.db = db;
//    next();
//});

app.use('/', index);
app.use('/android', android);
app.use('/insertFigurant', insertFigurant);
app.use('/figurants', figurants);
app.use('/evenements', evenements);
app.use('/insertEvenement', insertEvenement);
app.use('/role', role);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
