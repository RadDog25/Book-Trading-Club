var express = require('express');
var router = express.Router();
var passport = require('passport');
var getBooks = require('../helpers/getBooks.js');
var BookInstance = require('../models/BookInstance.js');
var Book = require('../models/Book.js');
var TradeRequest = require('../models/TradeRequest.js');
var bookPropertiesToSend = require('../whitelists/book.js');
var userPropertiesToSend = require('../whitelists/user.js');


router.get('/search', passport.authenticate('jwt', { session: false }), function(req, res) {
    var searchText = req.query.searchText;
    getBooks(searchText)
        .then(books => res.send(books));
});

router.get('/', passport.authenticate('jwt', { session: false }), async function(req, res) {

    var searchText = req.query.searchText || '';
    var bookInstancePopulateParams = [
        { path: 'book', select: bookPropertiesToSend.join(' ') },
        { path: 'user', select: userPropertiesToSend.join(' ') },
    ];

    if (!searchText) {
        var bookInstances = await BookInstance.find({})
            .select('book user')
            .populate(bookInstancePopulateParams)
            .exec();

        res.send(bookInstances);
        return;
    }

    var books = await Book.find({$text: {$search: searchText}})
        .sort({ 'updatedAt': -1 })
        .select('_id')
        .exec();

    if (!books.length) {
        res.status(404).send();
        return;
    }

    var bookQuery = books.map(book => {
        return {
            book: book._id
        }
    });

    var bookInstances = await BookInstance.find({})
        .or(bookQuery)
        .select('book user')
        .populate(bookInstancePopulateParams)
        .exec();

    res.send(bookInstances);   

});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        var id = req.params.id;
        var user = req.user;
    
        await TradeRequest.find()
            .or([
                { bookInstanceForRequester: id },
                { bookInstanceForOwner: id }
            ])
            .exec();
    
        await BookInstance.findByIdAndRemove(id)
            .exec();
    
        var userData = await user.getData();
        res.send(userData);
        
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

module.exports = router;




