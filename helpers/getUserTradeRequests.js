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
            .populate(['owner', 'requester'])
            .exec((err, tradeRequests) => {
                if (err) {
                    console.log(err);
                } else {
                    var getTradeRequests = tradeRequests.map(tradeRequest => {
                        return new Promise((resolve, reject) => {
                            TradeAction.find({ tradeRequest: tradeRequest._id })
                                .sort({ createdAt: -1 })
                                .populate(['actor', 'bookInstanceForRequester', 'bookInstanceForOwner'])
                                .deepPopulate(['bookInstanceForRequester.book', 'bookInstanceForOwner.book'])
                                .exec((err, tradeActions) => {
                                    if (err) {
                                        console.log(err);
                                    } else {

                                        var userTradeRequest = {
                                            ...getCleanTradeRequest(tradeRequest),
                                            tradeActions: tradeActions.map(getCleanTradeAction)
                                        }

                                        if (tradeActions && tradeActions.length) {
                                            var latestTradeAction = tradeActions[0];

                                            ['bookInstanceForRequester', 'bookInstanceForOwner'].forEach(item => {
                                                if (latestTradeAction[item]) {
                                                    userTradeRequest[item] = getCleanBookInstance(latestTradeAction[item]);
                                                }
                                            });
                                        }

                                        resolve(userTradeRequest);  
                                    }
                                });
                        });
                    });

                    Promise.all(getTradeRequests)
                        .then(tradeRequests => {
                            resolve(tradeRequests);
                        });
                }
            });
    });
}

module.exports = getUserTradeRequests;