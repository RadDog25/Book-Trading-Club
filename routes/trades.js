var express = require('express');
var router = express.Router();
var passport = require('passport');
var getUserData = require('../helpers/getUserData.js');
var BookInstance = require('../models/BookInstance.js');
var TradeRequest = require('../models/TradeRequest.js');

router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var user = req.user;
        var bookInstanceId = req.body.bookInstanceId;

        var bookInstance = await BookInstance.findById(bookInstanceId).exec();
        var ownerId = bookInstance.user;

        if (user._id.equals(ownerId)) {
            console.log('User trading for own book');
            res.status(400).send();
            return;
        }

        var existingTradeRequest = await TradeRequest.find({
            bookInstanceForRequester: bookInstanceId
        })
            .exec();
    
        if (existingTradeRequest.length) {
            console.log('Trade Request already exists');
            res.status(400).send();
            return;
        }

        var newTradeRequest = new TradeRequest({
            owner: ownerId,
            requester: user._id,
            bookInstanceForRequester: bookInstanceId,
        });
    
        await newTradeRequest.save();
        var userData = await getUserData(user);
        res.send(userData);
        
    } catch (error) {
        console.log(error);
        res.status(400).send()
    }
});

router.post('/:id', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var id = req.params.id;
        var bookInstanceForOwner = req.body.bookInstanceForOwner;
        var action = req.body.action;
        var user = req.user;

        var tradeRequest = await TradeRequest.findOne({ _id: id })
            .or([
                { $and: [{ owner: user._id }, { lastActionWasRequester: true }] },
                { $and: [{ requester: user._id }, { lastActionWasRequester: false }] }
            ])
            .where('status').in(['initiated', 'proposed'])
            .exec();

        var userIsOwner = user._id.equals(tradeRequest.owner._id);
        tradeRequest.ownerHasNotification = !userIsOwner;
        tradeRequest.requesterHasNotification = userIsOwner;

        if (action === 'accept') {

            await BookInstance.findOneAndUpdate({ _id: tradeRequest.bookInstanceForOwner }, {
                user: tradeRequest.owner
            }).exec();

            await BookInstance.findOneAndUpdate({ _id: tradeRequest.bookInstanceForRequester }, {
                user: tradeRequest.requester
            }).exec();

            tradeRequest.status = 'accepted';

        } else if (action === 'decline') {
            tradeRequest.status = 'declined';
        } else if (action === 'propose' && bookInstanceForOwner) {
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

router.get('/:id/partner', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var id = req.params.id;
        var user = req.user;
    
        var tradeRequest = await TradeRequest.findOne({ _id: id })
            .or([ { owner: user._id }, {requester: user._id} ])
            .select('owner requester')
            .populate(['owner', 'requester'])
            .exec();

        var tradePartner = tradeRequest.requester._id.equals(user._id) ?
        tradeRequest.owner : tradeRequest.requester;

        var tradePartnerData = await tradePartner.getData();     
        res.send(tradePartnerData);

    } catch (error) {
        console.log(error);
        res.status(400).send()
    }
});

router.delete('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    TradeRequest.collection.drop((err, doc) => {
        res.status(200).send();
    })
});

module.exports = router;