var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config');
var sanitizeUser = require('../helpers/sanitizeUser.js');


router.delete('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var bookToDelete = req.body.book;
    if (!bookToDelete._id) {
        res.status(400).send();
    } else {
        var user = req.user;
        var newBooks = user.books.filter(book => {
            return book._id !== bookToDelete._id
        });

        user.books = newBooks;
    
        user.save(function (err, updatedUser) {
            if (err) throw err;
            res
                .status(200)
                .send(sanitizeUser(updatedUser));
        });    
    }
});

module.exports = router;