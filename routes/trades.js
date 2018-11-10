var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var BookInstance = require('../models/BookInstance.js');
var TradeRequest = require('../models/TradeRequest.js');
var Notification = require('../models/Notification.js');

router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var user = req.user;
        var bookInstanceId = req.body.bookInstanceId;
        var bookInstance = await BookInstance.findById(bookInstanceId)
            .populate('book')
            .exec();

        var ownerId = bookInstance.user;

        if (user._id.equals(ownerId)) {
            console.log('User trading for own book');
            res.status(400).send();
            return;
        }

        var existingTradeRequest = await TradeRequest.find({
            bookInstanceForRequester: bookInstanceId,
            status: { $in: ['initiated', 'proposed', 'accepted'] }
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
    
        var notification = new Notification({
            user: ownerId,
            content: `${user.username} is interested in your copy of ${bookInstance.book.title}`,
            link: `/trade/${newTradeRequest._id}`
        });

        await newTradeRequest.save();
        await notification.save();

        var userData = await user.getData();
        res.send(userData);
        
    } catch (error) {
        console.log(error);
        res.status(400).send()
    }
});

router.post('/:id', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var id = req.params.id;
        var bookInstanceForOwnerId = req.body.bookInstanceForOwnerId;
        var action = req.body.action;
        var user = req.user;

        var tradeRequest = await TradeRequest.findOne({ _id: id })
            .or([
                { owner: user._id },
                { requester: user._id },
            ])
            .or([
                { status: 'accepted' },
                { $and: [{ owner: user._id }, { lastActionWasRequester: true }] },
                { $and: [{ requester: user._id }, { lastActionWasRequester: false }] }
            ])
            .where('status').in(['initiated', 'proposed', 'accepted'])
            .populate(['owner', 'requester', 'bookInstanceForOwner', 'bookInstanceForRequester'])
            .deepPopulate(['bookInstanceForOwner.book', 'bookInstanceForRequester.book'])
            .exec();

        var userIsOwner = user._id.equals(tradeRequest.owner._id);
        var partner = userIsOwner ? tradeRequest.requester : tradeRequest.owner;
        var requesterBookTitle = tradeRequest.bookInstanceForRequester.book.title;

        if (tradeRequest.bookInstanceForOwner) {
            var ownerBookTitle = tradeRequest.bookInstanceForOwner.book.title;
            var tradeRequestBooks = `(${ownerBookTitle}/${requesterBookTitle})`;    
        } else {
            var tradeRequestBooks = `(${requesterBookTitle})`
        }

        var notificationData = {
            user: partner._id,
            link: `/#/trade/${tradeRequest._id}`
        }

        if (action === 'confirm') {

            if (userIsOwner) {
                tradeRequest.confirmedByOwner = true;
            } else {
                tradeRequest.confirmedByRequester = true;
            }

            notificationData.content = `${partner.username} has confirmed the exchange of your trade ${tradeRequestBooks}`;

            if (tradeRequest.confirmedByOwner && tradeRequest.confirmedByRequester) {
                await BookInstance.findOneAndUpdate({ _id: tradeRequest.bookInstanceForOwner }, {
                    user: tradeRequest.owner
                }).exec();
    
                await BookInstance.findOneAndUpdate({ _id: tradeRequest.bookInstanceForRequester }, {
                    user: tradeRequest.requester
                }).exec();
    
                tradeRequest.status = 'completed';    
            }

        } else if (action === 'accept') {

            notificationData.content = `${partner.username} has accepted your trade request ${tradeRequestBooks}`;

            tradeRequest.status = 'accepted';
            tradeRequest.requesterEmail = tradeRequest.requester.getEmail();
            tradeRequest.ownerEmail = tradeRequest.owner.getEmail();

        } else if (action === 'decline') {

            notificationData.content = `${partner.username} has declined your trade request ${tradeRequestBooks}`;
            tradeRequest.status = 'declined';

        } else if (action === 'propose' && bookInstanceForOwnerId) {

            tradeRequest.status = 'proposed';
            var bookInstanceForOwner = await BookInstance.findById(bookInstanceForOwnerId)
                .exec();

            if (bookInstanceForOwner) {
                tradeRequest.bookInstanceForOwner = mongoose.Types.ObjectId(bookInstanceForOwnerId);
            } else {
                res.status(400).send();
                return;
            }

            notificationData.content = `${partner.username} has proposed a trade ${tradeRequestBooks}`;

        } else {
            res.status(401).send();
        }

        tradeRequest.lastActionWasRequester = !tradeRequest.lastActionWasRequester;
        await tradeRequest.save();

        var notification = new Notification(notificationData);
        await notification.save();

        var userData = await user.getData();
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