var getCleanBookInstance = require('./getCleanBookInstance.js');
var getCleanUser = require('./getCleanUser.js');

function getCleanTradeRequest(tradeRequest) {

    var {
        owner,
        requester,
        _id,
        createdAt,
        updatedAt,
        status,
        lastActionWasRequester
    } = tradeRequest;

    var owner = getCleanUser(owner);
    var requester = getCleanUser(requester);

    var cleanTradeRequest = {
        _id,
        createdAt,
        updatedAt,
        owner,
        requester,
        status,
        lastActionWasRequester
    };

    for (var key of ['bookInstanceForOwner', 'bookInstanceForRequester']) {
        if (tradeRequest[key]) {
            cleanTradeRequest[key] = getCleanBookInstance(tradeRequest[key]);
        }
    }
    
    return cleanTradeRequest;
}

module.exports = getCleanTradeRequest;