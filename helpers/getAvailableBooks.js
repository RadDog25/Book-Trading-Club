function getAvailableBooks(users) {
    var books = {};

    users.forEach(user => {
        if(user.books && user.books.length) {
            user.books.forEach(book => {
                if(books[book._id]) {
                    var bookUsers = books[book._id].users.concat(user);
                } else {
                    var bookUsers = [user];
                }

                books[book._id] = {
                    ...book,
                    users: bookUsers
                };
            });
        }
    });

    return Object.values(books);
}

module.exports = getAvailableBooks;