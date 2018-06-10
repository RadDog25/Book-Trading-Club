var express = require('express');
var router = express.Router();
var passport = require('passport');
var Book = require('../models/Book.js');
var BookInstance = require('../models/BookInstance.js');
var getUserData = require('../helpers/getUserData.js');


router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var books = req.body.books;
    var user = req.user;

    if (books.length <= 0) {
        res.status('400').send();
    } else {
        var options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };

        var booksToSave = books.map(book => {
            return new Promise((resolve, reject) => {                
                Book.findOneAndUpdate({ id: book.id }, book, options, function(err, newBook) {
                    if (err) {
                        console.log(err);
                    } else {
                        var bookInstance = new BookInstance({
                            book: newBook._id,
                            user: user._id
                        });

                        bookInstance.save(function(err, newBookInstance) {
                            if (err) {
                                console.log(err);
                            } else {
                                resolve(newBookInstance);
                            }
                        });
                    }
                });
            })
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




