var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');
var FormErrors = require('../helpers/FormErrors.js');
var User = require('../models/User.js');

router.post('/', async function(req, res) {
    try {
        var formErrors = new FormErrors(req, {
            requiredFields: [ 'username', 'password' ]
        });
    
        if (formErrors.any()) {
            res.status(400).send(formErrors.get());
            return;
        }
    
        var user = await User.findOne({
            username: req.body.username
        });
    
        if (!user) {
            formErrors.set('username', 'Username does not exist');
            res.status(401).send(formErrors.get());
            return;
        }
    
        // check if password matches
        user.comparePassword(req.body.password, async function (err, isMatch) {
            if (isMatch && !err) {
                // if user is found and password is right create a token
                var token = jwt.sign(user.toJSON(), config.secret);
                var userData = await user.getData();
                res.status(200)
                    .cookie('token', token, {
                        httpOnly: false
                    })
                    .send(userData);
                    
            } else {
                formErrors.set('password', 'Wrong password');
                res.status(401).send(formErrors.get());
            }
        });

    } catch (error) {
        console.log(error);
        res.send(400);
    }
});

module.exports = router;