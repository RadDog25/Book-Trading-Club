var getCleanObject = require('./getCleanObject.js');
var getCleanUser = require('./getCleanUser.js');

var bookPropertiesToSend = [
    'authors',
    'categories',
    'description',
    'id',
    'link',
    'publishedDate',
    'publisher',
    'thumbnail',
    'title',
    'ratingsCount',
    'averageRating'
];

function getCleanBookInstance(bookInstance) {

    var cleanBookInstance = {
        _id: bookInstance._id,
        user: getCleanUser(bookInstance.user),
    }

    if (bookInstance.book) {
        cleanBookInstance = {
            ...cleanBookInstance,
            ...getCleanObject(bookInstance.book, bookPropertiesToSend)
        }
    }

    return cleanBookInstance;
}

module.exports = getCleanBookInstance;