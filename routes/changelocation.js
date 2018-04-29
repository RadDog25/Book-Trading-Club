var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config');
var FormErrors = require('../helpers/FormErrors.js');
var sanitizeUser = require('../helpers/sanitizeUser.js');


// Models
var User = require('../models/User.js');


router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {

    var formErrors = new FormErrors(req, {
        requiredFields: [ 'location' ]
    });

    if( formErrors.any() ) {
        res
            .status(400)
            .send( formErrors.get() );
    } else {

        var user = req.user;
        user.location = req.body.location;
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