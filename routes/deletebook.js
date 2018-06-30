var express = require('express');
var router = express.Router();
var passport = require('passport');
var BookInstance = require('../models/BookInstance.js');
var TradeRequest = require('../models/TradeRequest.js');
var getUserData = require('../helpers/getUserData.js');


router.delete('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var bookToDelete = req.body.book;
    if (!bookToDelete._id) {
        res.status(400).send();
    } else {
        var user = req.user;

        TradeRequest.findOneAndRemove({ bookInstance: bookToDelete._id }, function(err, bookInstance) {
            console.log(bookInstance);

            BookInstance.findByIdAndRemove(bookToDelete._id, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    getUserData(user)
                        .then(userData => {
                            res.status(200).send(userData);
                        })
                        .catch(err => console.log(err));
                }
            });
        });
    }
});

module.exports = router;