function sanitizeUser({ username, location, avatar }) {
    return {
        username,
        location,
        avatar
    }
}

module.exports = sanitizeUser;