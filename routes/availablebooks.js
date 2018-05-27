var express = require('express');
var router = express.Router();
var passport = require('passport');
var getAvailableBooks = require('../helpers/getAvailableBooks.js');
var getSearchedBooks = require('../helpers/getSearchedBooks.js');
var User = require('../models/User.js');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var searchText = req.query.searchText;

    User.find({}, function(err, users) {
        if(!err) {
            var books = getAvailableBooks(users);
            
            if(searchText) {
                var searchedBooks = getSearchedBooks(books);
                res.send(searchedBooks);
            } else {
                res.send(books);
            }
        }
    });
});

module.exports = router;




