var express = require('express');
var router = express.Router();
var passport = require('passport');
var getBooks = require('../helpers/getBooks.js');
var Book = require('../models/Book.js');
var User = require('../models/User.js');
var sanitizeUser = require('../helpers/sanitizeUser.js');
var ObjectId = require('mongodb').ObjectID;


router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var books = req.body.books;
    if(books.length <= 0) {
        res.status('400').send();
    } else {
        var options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };

        var booksToSave = books.map(book => {
            var newBook = {
                _id: book.id,
                ...book
            };

            return new Promise((resolve, reject) => {                
                Book.findByIdAndUpdate(book.id, newBook, options, function(err, newBook) {
                    if(!err) resolve(newBook);
                });
            })
        });

        Promise.all(booksToSave)
            .then(newBooks => {
                if(newBooks.length > 0) {
                    var user = req.user;
                    var userBookIds = user.books.map(book => book._id);
                    newBooks.forEach(newBook => {
                        if(!userBookIds.includes(newBook._id)) {
                            user.books.push(newBook);
                        }
                    });

                    user.save(function (err, updatedUser) {
                        if (err) throw err;
                        res
                            .status(200)
                            .send(sanitizeUser(updatedUser));
                    });    
                }
            })

    }
});

module.exports = router;




