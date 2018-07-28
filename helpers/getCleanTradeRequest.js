var getCleanBookInstance = require('./getCleanBookInstance.js');
var getCleanUser = require('./getCleanUser.js');

function getCleanTradeRequest(tradeRequest) {
    var owner = getCleanUser(tradeRequest.owner);
    var requester = getCleanUser(tradeRequest.requester);
    var book = getCleanBookInstance(tradeRequest.bookInstance);

    var cleanTradeRequest = {
        _id: tradeRequest._id,
        createdAt: tradeRequest.createdAt,
        updatedAt: tradeRequest.updatedAt,
        owner,
        requester,
        book
    };
    
    return cleanTradeRequest;
}

module.exports = getCleanTradeRequest;