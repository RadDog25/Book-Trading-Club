var TradeRequest = require('../models/TradeRequest.js');
var getCleanTradeRequest = require('./getCleanTradeRequest.js');

function getUserTradeRequests(user) {
    return new Promise((resolve, reject) => {
        TradeRequest.find({ owner: user._id })
            .populate(['owner', 'requester', 'bookInstance'])
            .deepPopulate('bookInstance.book')
            .exec((err, tradeRequests) => {
                if (err) {
                    console.log(err);
                } else {
                    var cleanTradeRequests = tradeRequests.map(getCleanTradeRequest);
                    resolve(cleanTradeRequests);
                }
            });
    });
}

module.exports = getUserTradeRequests;