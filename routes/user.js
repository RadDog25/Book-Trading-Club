var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var user = { ...req.user._doc };
    delete user.password;
    delete user._id;

    res.send(user);
});

module.exports = router;