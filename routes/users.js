var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User.js');

router.get('/:id', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var id = req.params.id;
        var user;
        console.log(id);

        if (id === 'me') {
            user = req.user;
        } else {
            user = await User.findById(id).exec();
        }

        var userData = await user.getData();
        console.log(userData);
        res.send(userData);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

module.exports = router;