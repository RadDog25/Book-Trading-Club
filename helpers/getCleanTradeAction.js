var getCleanObject = require('./getCleanObject.js');
var getCleanUser = require('./getCleanUser.js');
var getCleanBookInstance = require('./getCleanBookInstance.js');

var tradeActionPropertiesToSend = [
    'action',
    'createdAt',
    'updatedAt',
    '_id'
];

function getCleanTradeAction(tradeAction) {

    var { actor, bookInstanceForRequester, bookInstanceForOwner } = tradeAction;

    var cleanTradeAction = {
        actor: getCleanUser(actor),
        ...getCleanObject(tradeAction, tradeActionPropertiesToSend)
    };

    if (bookInstanceForRequester) {
        cleanTradeAction.bookInstanceForRequester = getCleanBookInstance(bookInstanceForRequester);
    }

    if (bookInstanceForOwner) {
        cleanTradeAction.bookInstanceForOwner = getCleanBookInstance(bookInstanceForOwner);
    }

    return cleanTradeAction;
}

module.exports = getCleanTradeAction;