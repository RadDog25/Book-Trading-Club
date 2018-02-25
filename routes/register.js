var express = require('express');
var router = express.Router();

// Models
var User = require('../models/User.js');

router.post('/', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res
            .status(400)
            .json({ success: false, message: 'Missing username or password'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        newUser.save(function(err) {
            if (err) {
                res
                    .status(400)
                    .json({ success: false, message: "username already exists", error: err });
            } else {
                res
                    .status(201)
                    .json({ success: true, message: 'Successful created new user' });
            }
        });
    }
});

module.exports = router;