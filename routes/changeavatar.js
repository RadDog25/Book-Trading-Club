var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config');
var sanitizeUser = require('../helpers/sanitizeUser.js');


// Models
var User = require('../models/User.js');


router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var avatar = req.body.avatar;
    if(avatar >= 0 && avatar <= 8) {
        var user = req.user;
        user.avatar = avatar;
        user.save(function (err, updatedUser) {
            console.log(updatedUser);
            if (err) throw err;
            res
                .status(200)
                .send(sanitizeUser(updatedUser));
        });
    }
});

module.exports = router;