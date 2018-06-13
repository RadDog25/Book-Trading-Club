var getCleanObject = require('./getCleanObject.js');

var userPropertiesToSend = [
    '_id',
    'username',
    'location',
    'avatar',
];

function getCleanUser(user) {
    return getCleanObject(user, userPropertiesToSend);
}

module.exports = getCleanUser;