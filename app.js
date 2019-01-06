var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var favicon = require('serve-favicon');

var app = express();

// Models
var User = require('./models/User.js');

// Routes
var routes = [
  {
    module: require('./routes/users'),
    endpoint: '/api/users'
  },
  {
    module: require('./routes/register'),
    endpoint: '/api/register'
  },
  {
    module: require('./routes/login'),
    endpoint: '/api/login'
  },
  {
    module: require('./routes/books'),
    endpoint: '/api/books'
  },
  {
    module: require('./routes/trades'),
    endpoint: '/api/trades'
  },
  {
    module: require('./routes/notifications'),
    endpoint: '/api/notifications'
  }
];

// Connect to database
var dbUrl = process.env.DB_URL || require('./config').dbUrl;
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl);

function cookieExtractor(req) {
  if (req && req.cookies) {
      return req.cookies['token'];
  }

  return null;
};

var jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET || require('./config').secret
};

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  User.findOne({ _id: jwt_payload._id }, function(err, user) {
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
app.use(favicon(__dirname + '/public/static/favicon.ico'));

routes.forEach(route => {
    app.use(route.endpoint, route.module);
})

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

  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.json({
    success: false,
    msg: '500'
  });
});

module.exports = app;
