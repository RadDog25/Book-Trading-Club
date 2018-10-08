var TradeRequest = require('../models/TradeRequest.js');
var TradeAction = require('../models/TradeAction.js');
var getCleanUser = require('./getCleanUser.js');
var getCleanBookInstance = require('./getCleanBookInstance.js');
var getCleanTradeRequest = require('./getCleanTradeRequest.js');
var getCleanTradeAction = require('./getCleanTradeAction.js');

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