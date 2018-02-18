var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

var users = require('./routes/users');

var app = express();

// mongodb://<dbuser>:<dbpassword>@ds239648.mlab.com:39648/book-trading-club-dev

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var dbUrl = `mongodb://${config.username}:${config.password}@${config.url}:${config.port}/${config.db}`;
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', console.log.bind(console, 'connection success!'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public/dist')));

app.use('/api/users', users);

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
