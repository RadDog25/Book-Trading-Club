var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');
var FormErrors = require('../helpers/FormErrors.js');

// Models
var User = require('../models/User.js');

router.post('/', function(req, res) {
    var formErrors = new FormErrors(req, {
        requiredFields: [ 'username', 'password' ]
    });

    if( formErrors.any() ) {
        res
            .status(400)
            .send( formErrors.get() );
    } else {
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                formErrors.set('username', 'Username does not exist');
                res
                    .status(401)
                    .send( formErrors.get() );
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign(user.toJSON(), config.secret);
                        res
                            .status(200)
                            .cookie('token', token, {
                                httpOnly: false
                            })
                            .send(user);
                    } else {
                        formErrors.set('password', 'Wrong password');
                        res
                            .status(401)
                            .send( formErrors.get() );
                    }
                });
            }
        });
    }
});

module.exports = router;