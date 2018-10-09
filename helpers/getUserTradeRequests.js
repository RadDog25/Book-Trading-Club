var TradeRequest = require('../models/TradeRequest.js');
var getCleanTradeRequest = require('./getCleanTradeRequest.js');

function getUserTradeRequests(user) {
    return new Promise((resolve, reject) => {
        TradeRequest.find()
            .or([{ owner: user._id }, { requester: user._id }])
            .populate(['owner', 'requester', 'bookInstanceForOwner', 'bookInstanceForRequester'])
            .deepPopulate(['bookInstanceForOwner.book', 'bookInstanceForRequester.book'])
            .exec()
            .then(tradeRequests => {
                resolve(tradeRequests.map(getCleanTradeRequest));
            })
            .catch(err => console.log(err));
    });
}

module.exports = getUserTradeRequests;