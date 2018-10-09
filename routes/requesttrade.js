var express = require('express');
var router = express.Router();
var passport = require('passport');
var TradeRequest = require('../models/TradeRequest.js');


router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var user = req.user;
        var bookInstance = req.body.book;
        var bookInstanceId = bookInstance._id;
        var ownerId = bookInstance.user._id;
        var requesterId = req.body.requesterId;

        if (user._id.equals(ownerId)) {
            console.log('User trading for own book')
            res.status(400).send()
        }

        var newTradeRequest = new TradeRequest({
            owner: ownerId,
            requester: requesterId,
            bookInstanceForRequester: bookInstanceId,
        });
    
        await newTradeRequest.save();
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(400).send()
    }
});

module.exports = router;