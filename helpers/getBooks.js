var books = require('google-books-search');

var mandatoryFields = [
    'thumbnail',
    'authors',
    'title',
    'description',
    'publishedDate'
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

module.exports = getBooks;




