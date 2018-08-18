var express = require('express');
var router = express.Router();
var passport = require('passport');
var getUserData = require('../helpers/getUserData.js');
var TradeRequest = require('../models/TradeRequest.js');


router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var tradeRequestId = req.query.id;
    var user = req.user;

    TradeRequest.findOne({ _id: tradeRequestId })
        .or([ { owner: user._id }, {requester: user._id} ])
        .select('owner requester')
        .populate(['owner', 'requester'])
        .exec(function (err, tradeRequest) {
            if(err) {
                console.log(err);
            } else if (tradeRequest && tradeRequest.requester && tradeRequest.owner) {
                var tradePartner = tradeRequest.requester._id.equals(user._id) ?
                tradeRequest.owner : tradeRequest.requester;
                
                getUserData(tradePartner)
                    .then(tradePartnerData => {
                        res.status(200).send(tradePartnerData);
                    })
                    .catch(err => console.log(err));
            } else {
                res.status(400);
            }
        });
});

module.exports = router;