var express = require('express');
var router = express.Router();
var passport = require('passport');
var getUserData = require('../helpers/getUserData.js');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var user = req.user;

    getUserData(user)
        .then(userData => {
            res.status(200).send(userData);
        })
        .catch(err => console.log(err));
});

module.exports = router;