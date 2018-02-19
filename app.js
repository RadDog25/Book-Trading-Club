var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var app = express();
var config = require('./config');

// Models
var User = require('./models/User.js');

// Routes
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');

// Connect to database
var dbUrl = `mongodb://${config.username}:${config.password}@${config.url}:${config.port}/${config.db}`;
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', console.log.bind(console, 'connection success!'));




var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  User.findOne({ id: jwt_payload.id }, function(err, user) {
    if (err) {
      return done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));


app.use(passport.initialize());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public/dist')));

app.use('/api/users', users);
app.use('/api/register', register);
app.use('/api/login', login);


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
  res.json({
    success: false,
    msg: '500'
  });
});

module.exports = app;
