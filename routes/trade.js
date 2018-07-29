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
    var proposedBookInstance = req.body.book;
    var user = req.user;
    
    TradeRequest.findOneAndRemove({ _id: tradeRequestId, owner: user._id })
        .populate(['requester', 'bookInstance'])
        .exec(function (err, tradeRequest) {
            if(err) {
                console.log(err);
            } else {
                BookInstance.findOneAndUpdate({ _id: proposedBookInstance._id }, { user: user._id }, options, function(err) {
                // BookInstance.findOne({ _id: proposedBookInstance._id }, function(err, book) {
                    if(err) {
                        console.log(err);
                    } else {
                        BookInstance.findOneAndUpdate({ _id: tradeRequest.bookInstance._id }, { user: tradeRequest.requester._id }, options, function(err) {
                        // BookInstance.findOne({ _id: tradeRequestBookInstance._id }, function(err, tradeRequestBook) {
                            if(err) {
                                console.log(err);
                            } else {
                                getUserData(user)
                                    .then(userData => {
                                        res.status(200).send(userData);
                                    })
                                    .catch(err => console.log(err));
                            }
                        })
                    }
                });
            }
        });
});

module.exports = router;