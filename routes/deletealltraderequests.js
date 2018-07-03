var express = require('express');
var router = express.Router();
var passport = require('passport');
var TradeRequest = require('../models/TradeRequest.js');
var getUserData = require('../helpers/getUserData.js');


router.delete('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    TradeRequest.collection.drop((err, doc) => {
        res.send('deleted');
    })
});

module.exports = router;