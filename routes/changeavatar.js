var express = require('express');
var router = express.Router();
var passport = require('passport');
var getUserData = require('../helpers/getUserData.js');


// Models
var User = require('../models/User.js');


router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var avatar = req.body.avatar;
    if(avatar >= 0 && avatar <= 8) {
        var user = req.user;
        user.avatar = avatar;
        user.save(function (err, updatedUser) {
            if (err) {
                console.log(err);
            } else {
                getUserData(updatedUser)
                    .then(userData => {
                        res.status(200).send(userData);
                    })
                    .catch(err => console.log(err));
            }
        });
    }
});

module.exports = router;