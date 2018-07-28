var express = require('express');
var router = express.Router();
var passport = require('passport');
var TradeRequest = require('../models/TradeRequest.js');


router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var bookInstance = req.body.book;
    var bookInstanceId = bookInstance._id;
    var ownerId = bookInstance.user._id;
    var requesterId = req.body.requesterId;

    var newTradeRequest = new TradeRequest({
        bookInstance: bookInstanceId,
        owner: ownerId,
        requester: requesterId
    });

    newTradeRequest.save((err, newTradeRequest) => {
        if (err) {
            console.log(err);
        } else {
            newTradeRequest.populate(['owner', 'requester', 'bookInstance'], function(err, populatedTradeRequest) {
                console.log(populatedTradeRequest);
                res.status(200).send();
            });
        }
    });
});

module.exports = router;