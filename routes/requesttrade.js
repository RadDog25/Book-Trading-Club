var express = require('express');
var router = express.Router();
var passport = require('passport');
var TradeRequest = require('../models/TradeRequest.js');
var TradeAction = require('../models/TradeAction.js');


router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var bookInstance = req.body.book;
    var bookInstanceId = bookInstance._id;
    var ownerId = bookInstance.user._id;
    var requesterId = req.body.requesterId;

    var newTradeRequest = new TradeRequest({
        owner: ownerId,
        requester: requesterId,
        bookInstanceForRequester: bookInstanceId,
    });

    newTradeRequest.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send();
        }
    });
});

module.exports = router;