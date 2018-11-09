var express = require('express');
var FormErrors = require('../helpers/FormErrors.js');
var router = express.Router();
var User = require('../models/User.js');

router.post('/', function(req, res) {

    var formErrors = new FormErrors(req, {
        requiredFields: ['username', 'password']
    });

    if (formErrors.any()) {
        res.status(400).send(formErrors.get());
        return;
    }

    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err) {
        if (err) {
            formErrors.set('username', 'Username already exists');
            res.status(400).send(formErrors.get());
        } else {
            var message = 'Successful created new user';
            res.status(201).send(message);
        }
    });
});

module.exports = router;