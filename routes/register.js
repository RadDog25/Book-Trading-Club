var express = require('express');
var FormErrors = require('../helpers/FormErrors.js');
var router = express.Router();

// Models
var User = require('../models/User.js');

router.post('/', function(req, res) {

    var formErrors = new FormErrors(req, {
        requiredFields: [ 'username', 'password' ]
    });

    if ( formErrors.any() ) {
        res
            .status(400)
            .send( formErrors.get() );
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.username
        });

        newUser.save(function(err) {
            if (err) {
                formErrors.set('username', 'Username already exists')
                res
                    .status(400)
                    .send( formErrors.get() );
            } else {
                res
                    .status(201)
                    .send('Successful created new user');
            }
        });
    }
});

module.exports = router;