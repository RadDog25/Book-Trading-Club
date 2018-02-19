var express = require('express');
var router = express.Router();

// Models
var User = require('../models/User.js');

router.post('/', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass email and password.'});
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({ success: false, msg: 'email already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
});

module.exports = router;