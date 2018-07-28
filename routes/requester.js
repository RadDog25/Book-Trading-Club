var express = require('express');
var router = express.Router();
var passport = require('passport');
var getUserData = require('../helpers/getUserData.js');
var User = require('../models/User.js');
var TradeRequest = require('../models/TradeRequest.js');


router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var tradeRequestId = req.query.id;
    var user = req.user;

    TradeRequest.findOne({ _id: tradeRequestId, owner: user._id })
        .select('requester')
        .populate('requester')
        .exec(function (err, tradeRequest) {
            if(err) {
                console.log(err);
            } else {
                var requester = tradeRequest.requester;
                getUserData(requester)
                    .then(requesterData => {
                        res.status(200).send(requesterData);
                    })
                    .catch(err => console.log(err));
            }
        });
});

module.exports = router;