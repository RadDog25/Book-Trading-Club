var Book = require('../models/Book.js');
var BookInstance = require('../models/BookInstance.js');

var options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
};

function saveBook(book, user) {
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
}

module.exports = saveBook;




