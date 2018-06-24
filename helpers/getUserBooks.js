var BookInstance = require('../models/BookInstance.js');
var getCleanBookInstance = require('./getCleanBookInstance.js');
var getCleanUser = require('./getCleanUser.js');

function getUserBooks(user) {
    return new Promise((resolve, reject) => {
        BookInstance.find({ user: user._id })
            .populate('book')
            .exec((err, bookInstances) => {
                if (err) {
                    console.log(err);
                } else {
                    var cleanBookInstances = bookInstances.map(getCleanBookInstance);
                    resolve(cleanBookInstances);
                }
            });
    });
}

module.exports = getUserBooks;