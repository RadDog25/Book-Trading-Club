function getSearchedBooks(books, searchText) {
    return books.filter(book => {
        var bookText = JSON.stringify(Object.values(book));

        return bookText.includes(searchText);
    });
}

module.exports = getSearchedBooks;