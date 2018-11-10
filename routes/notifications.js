var express = require('express');
var router = express.Router();
var passport = require('passport');
var Notification = require('../models/Notification.js');

router.put('/', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {

        var user = req.user;
        var link = req.body.link;
        await Notification.update({ link, user: user._id }, { new: false }).exec();
        var userData = await user.getData();
        res.send(userData)
    
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

module.exports = router;




