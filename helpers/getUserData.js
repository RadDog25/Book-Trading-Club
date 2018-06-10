var BookInstance = require('../models/BookInstance.js');

function getCleanObject(dirtyObject, propertiesToKeep) {
    return propertiesToKeep.reduce((cleanObject, propertyToKeep) => {
        if (dirtyObject[propertyToKeep] !== undefined) {
            cleanObject[propertyToKeep] = dirtyObject[propertyToKeep];
        }

        return cleanObject;
    }, {});
}

var userPropertiesToSend = [
    '_id',
    'username',
    'location',
    'avatar',
];

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

function getUserData(user) {
    return new Promise((resolve, reject) => {
        BookInstance.find({ user: user._id })
            .populate('book')
            .exec((err, bookInstances) => {
                if (err) {
                    console.log(err);
                } else {
                    var cleanUser = getCleanObject(user, userPropertiesToSend);
                    var cleanBookInstances = bookInstances.map(bookInstance => {
                        var bookProperties = getCleanObject(bookInstance.book, bookPropertiesToSend);

                        return {
                            _id: bookInstance._id,
                            ...bookProperties
                        }
                    });

                    var userData = {
                        ...cleanUser,
                        books: cleanBookInstances
                    };

                    resolve(userData);
                }
            });
    });
}

module.exports = getUserData;