var getUserBooks = require('./getUserBooks.js');
var getUserTradeRequests = require('./getUserTradeRequests.js');
var getCleanUser = require('./getCleanUser.js');

function getUserData(user) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getUserBooks(user),
            getUserTradeRequests(user)
        ])
            .then(function ([books, tradeRequests] = userData) {

                var cleanUserData = {
                    ...getCleanUser(user),
                    books,
                    tradeRequests
                };

                resolve(cleanUserData);
            });
    });
}

module.exports = getUserData;