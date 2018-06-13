var BookInstance = require('../models/BookInstance.js');
var getCleanBook = require('./getCleanBook.js');
var getCleanUser = require('./getCleanUser.js');

function getUserData(user) {
    return new Promise((resolve, reject) => {
        BookInstance.find({ user: user._id })
            .populate('book')
            .exec((err, bookInstances) => {
                if (err) {
                    console.log(err);
                } else {
                    var cleanUser = getCleanUser(user);
                    var cleanBookInstances = bookInstances.map(bookInstance => {
                        var bookProperties = getCleanBook(bookInstance.book);

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