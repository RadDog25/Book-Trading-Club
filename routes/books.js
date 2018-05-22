var express = require('express');
var router = express.Router();
var passport = require('passport');
var getBooks = require('../helpers/getBooks.js');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var searchText = req.query.searchText || 'harry potter';
    getBooks(searchText)
        .then(books => res.send(books));
});

module.exports = router;




