var express = require('express');
var router = express.Router();
var passport = require('passport');
var getUserData = require('../helpers/getUserData.js');
var BookInstance = require('../models/BookInstance.js');
var TradeRequest = require('../models/TradeRequest.js');

var options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
};

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var tradeRequestId = req.body.id;
    var bookInstanceForOwner = req.body.bookInstanceForOwner;
    var bookInstanceForRequester = req.body.bookInstanceForRequester;
    var action = req.body.action;
    var user = req.user;

    // first check that user is part of this trade, that they did not make the last action, and that the trade is not cancelled

    TradeRequest.findOne({ _id: tradeRequestId })
        .or([
            { $and: [{ owner: user._id }, { lastActionWasRequester: true }] },
            { $and: [{ requester: user._id }, { lastActionWasRequester: false }] }
        ])
        .where('status').in(['initiated', 'proposed'])
        .exec(async function(err, tradeRequest) {
            tradeRequest.lastActionWasRequester = !tradeRequest.lastActionWasRequester;

            if (action == 'accept' && tradeRequest.bookInstanceForOwner && tradeRequest.bookInstanceForRequester) {



                tradeRequest.status = 'accepted';

            } else if (action == 'decline') {
                tradeRequest.status = 'declined';
            } else if (action == 'propose' && bookInstanceForOwner) {
                tradeRequest.status = 'proposed';
                tradeRequest.bookInstanceForOwner = bookInstanceForOwner;
            } else {
                res.status(401).send();
            }

            tradeRequest.save(err => {
                getUserData(user)
                    .then(userData => {
                        res.send(userData);
                    });
            });
        });
});

module.exports = router;