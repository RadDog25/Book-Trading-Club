var express = require('express');
var router = express.Router();
var passport = require('passport');
var getCleanUser = require('../helpers/getCleanUser.js');
var getCleanBook = require('../helpers/getCleanBook.js');
var BookInstance = require('../models/BookInstance.js');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var searchText = req.query.searchText;
    BookInstance.find({})
        .populate(['book', 'user'])
        .exec(function(err, bookInstances) {
            if (err) {
                console.log(err);
            } else {
                if (searchText && searchText.length) {
                    bookInstances = bookInstances.filter(bookInstance => {
                        var searchableText = [
                            bookInstance.book.categories.join(''),
                            bookInstance.book.description,
                            bookInstance.book.title,
                            bookInstance.book.authors.join('')
                        ]
                            .join('')
                            .toLowerCase();

                        return searchableText.includes(searchText.toLowerCase());
                    });
                }

                bookInstances = bookInstances.map(bookInstance => {
                    return {
                        _id: bookInstance._id,
                        ...getCleanBook(bookInstance.book),
                        user: getCleanUser(bookInstance.user)
                    };
                });

                res.send(bookInstances);
            }
        });    
});

module.exports = router;




