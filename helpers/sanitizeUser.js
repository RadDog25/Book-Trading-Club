function sanitizeUser({ username, location }) {
    return {
        username,
        location
    }
}

module.exports = sanitizeUser;