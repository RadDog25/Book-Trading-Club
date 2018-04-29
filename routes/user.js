var express = require('express');
var router = express.Router();
var passport = require('passport');
var sanitizeUser = require('../helpers/sanitizeUser.js');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send(sanitizeUser(req.user._doc));
});

module.exports = router;