var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User.js');
var FormErrors = require('../helpers/FormErrors.js');

router.get('/:id', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var id = req.params.id;
        var user;

        if (id === 'me') {
            user = req.user;
        } else {
            user = await User.findById(id).exec();
        }

        var userData = await user.getData();
        res.send(userData);

    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

router.put('/me/avatar', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {

        var user = req.user;
        user.avatar = req.body.avatar;
        await user.save();
        var userData = await user.getData();
        res.send(userData);

    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

router.put('/me/location', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var formErrors = new FormErrors(req, {
            requiredFields: [ 'location' ]
        });
    
        if (formErrors.any()) {
            res.status(400).send(formErrors.get());
            return;
        }

        var user = req.user;
        user.location = req.body.location;
        await user.save();
        var userData = await user.getData();
        res.send(userData);
            
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

router.put('/me/password', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var formErrors = new FormErrors(req, {
            requiredFields: [
                {
                    key: 'oldPassword',
                    label: 'old password'
                },
                {
                    key: 'newPassword',
                    label: 'new password'
                }
            ]
        });
    
        if (formErrors.any()) {
            res.status(400).send(formErrors.get());
            return;
        }

        // check if password matches
        var user = req.user;
        user.comparePassword(req.body.oldPassword, async function(err, isMatch) {

            if (isMatch && !err) {

                user.password = req.body.newPassword;
                await user.save();
                res.status(200).send();

            } else {
                formErrors.set('oldPassword', 'Wrong password');
                res.status(401).send(formErrors.get());
            }
        });
            
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

module.exports = router;