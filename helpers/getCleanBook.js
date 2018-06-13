var getCleanObject = require('./getCleanObject.js');

var bookPropertiesToSend = [
    'authors',
    'categories',
    'description',
    'id',
    'link',
    'publishedDate',
    'publisher',
    'thumbnail',
    'title'
];

function getCleanBook(book) {
    return getCleanObject(book, bookPropertiesToSend);
}

module.exports = getCleanBook;