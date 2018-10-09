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

router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var tradeRequestId = req.body.id;
        var bookInstanceForOwner = req.body.bookInstanceForOwner;
        var action = req.body.action;
        var user = req.user;

        var tradeRequest = await TradeRequest.findOne({ _id: tradeRequestId })
            .or([
                { $and: [{ owner: user._id }, { lastActionWasRequester: true }] },
                { $and: [{ requester: user._id }, { lastActionWasRequester: false }] }
            ])
            .where('status').in(['initiated', 'proposed'])
            .exec();

        if (action == 'accept') {

            await BookInstance.findOneAndUpdate({ _id: tradeRequest.bookInstanceForOwner }, {
                user: tradeRequest.owner
            }).exec();

            await BookInstance.findOneAndUpdate({ _id: tradeRequest.bookInstanceForRequester }, {
                user: tradeRequest.requester
            }).exec();

            tradeRequest.status = 'accepted';

        } else if (action == 'decline') {
            tradeRequest.status = 'declined';
        } else if (action == 'propose' && bookInstanceForOwner) {
            tradeRequest.status = 'proposed';
            tradeRequest.bookInstanceForOwner = bookInstanceForOwner;
        } else {
            res.status(401).send();
        }

        tradeRequest.lastActionWasRequester = !tradeRequest.lastActionWasRequester;
        await tradeRequest.save();
        var userData = await getUserData(user);
        res.send(userData);

    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

module.exports = router;