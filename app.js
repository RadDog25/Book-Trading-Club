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
var routes = [
  {
    module: require('./routes/user'),
    endpoint: '/api/user'
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
    module: require('./routes/user'),
    endpoint: 'api/user'
  },
  {
    module: require('./routes/books'),
    endpoint: '/api/books'
  },
  {
    module: require('./routes/changepassword'),
    endpoint: '/api/changepassword'
  },
  {
    module: require('./routes/changelocation'),
    endpoint: '/api/changelocation'
  }
];

// Connect to database
var dbUrl = `mongodb://${config.username}:${config.password}@${config.url}:${config.port}/${config.db}`;
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', console.log.bind(console, 'connection success!'));

function cookieExtractor(req) {
  if (req && req.cookies) {
      return req.cookies['token'];
  }

  return null;
};

var jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.secret
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
