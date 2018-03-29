var express = require('express');
var router = express.Router();
var passport = require('passport');
var books = require('google-books-search');

var mandatoryFields = [
    'thumbnail',
    'authors',
    'title'
];

function getBooks(query) {
    return new Promise((res, rej) => {
        books.search(query, function(error, results) {
            if (!error) {
                var books = results.filter(book => {
                    return mandatoryFields.every(mandatoryField => {
                        return book[mandatoryField];
                    });
                });

                res(books);
            }
        });
    });
}

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    getBooks('wheel of time')
        .then(books => res.send(books));
});

module.exports = router;




