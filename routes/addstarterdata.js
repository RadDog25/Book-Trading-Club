var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User.js');
var getBooks = require('../helpers/getBooks.js');
var saveBook = require('../helpers/saveBook.js');
var getUserData = require('../helpers/getUserData.js');


var users = [
    {
        user: {
            username: 'Tommy',
            password: 'password',
            location: 'Port Grey',
            avatar: 2
        },
        titles: [
            'foundation',
            'caves of steel',
            'dune',
            "ender's game",
        ],
    },
    {
        user: {
            username: 'Susan',
            password: 'password',
            location: 'Yorkshire',
            avatar: 5
        },
        titles: [
            'guns, germs, and steel',
            'neuromancer',
            'steve jobs',
            'hyperion',
        ],
    },
    {
        user: {
            username: 'Mary',
            password: 'password',
            location: 'Amsterdam',
            avatar: 7
        },
        titles: [
            'ringworld',
            'electric sheep',
            'hunger games',
            'chamber of secrets',
        ],
    },
    {
        user: {
            username: 'Snoop Dog',
            password: 'snoop',
            location: 'Huntington Beach',
            avatar: 8
        },
        titles: [
            "philosopher's stone",
            '4 hour workweek',
        ],
    },
    {
        user: {
            username: 'Mikey',
            password: 'password',
            location: 'Burlington',
            avatar: 3
        },
        titles: [
            '4 hour body',
            'the alchemist',
        ],
    },
    {
        user: {
            username: 'Bobby',
            password: 'password',
            location: 'Bellingham',
            avatar: 1
        },
        titles: [
            'moby dick',
            "canterbury tale's",
            '1984',
        ],
    }    
];

var options = {
    upsert: true,
    new: true
};

router.post('/', function(req, res) {
    var personsToSave = users.map(person => {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ username: person.user.username }, person.user, options, (err, newUser) => {
                if (err) {
                    console.log(err);
                } else {
                    var searches = person.titles.map(title => getBooks(title));
                    Promise.all(searches)
                        .then(results => {
                            var books = results.map(result => result[0]);
                            var booksToSave = books.map(book => saveBook(book, newUser));
                            return Promise.all(booksToSave);
                        })
                        .then(() => {
                            return getUserData(newUser);
                        })
                        .then(userData => {
                            resolve(userData);
                        })
                }
            })
        }); 
    })

    Promise.all(personsToSave)
        .then(users => {
            res.send(users);
        });
});

module.exports = router;