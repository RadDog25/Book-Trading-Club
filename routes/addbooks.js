var express = require('express');
var router = express.Router();
var passport = require('passport');
var Book = require('../models/Book.js');
var BookInstance = require('../models/BookInstance.js');
var getUserData = require('../helpers/getUserData.js');
var saveBook = require('../helpers/saveBook.js');


router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var books = req.body.books;
    var user = req.user;

    if (books.length <= 0) {
        res.status('400').send();
    } else {

        var booksToSave = books.map(book => {
            return saveBook(book, user);
        });

        Promise.all(booksToSave)
            .then(() => {
                getUserData(user)
                    .then(userData => {
                        res.status(200).send(userData);
                    })
                    .catch(err => console.log(err));
            });
    }
});

module.exports = router;




