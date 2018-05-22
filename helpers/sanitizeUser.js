var propertiesToSend = [
    'username',
    'location',
    'avatar',
    'books'
];


function sanitizeUser(user) {
    var sanitizedUser = {};
    propertiesToSend.forEach(property => {
        sanitizedUser[property] = user[property];
    });

    return sanitizedUser;
}

module.exports = sanitizeUser;