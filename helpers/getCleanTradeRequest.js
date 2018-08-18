var getCleanBookInstance = require('./getCleanBookInstance.js');
var getCleanUser = require('./getCleanUser.js');

function getCleanTradeRequest(tradeRequest) {
    var { owner, requester, _id, createdAt, updatedAt } = tradeRequest;
    var owner = getCleanUser(owner);
    var requester = getCleanUser(requester);


    var cleanTradeRequest = {
        _id,
        createdAt,
        updatedAt,
        owner,
        requester,
    };
    
    return cleanTradeRequest;
}

module.exports = getCleanTradeRequest;