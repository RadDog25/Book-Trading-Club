var env = process.env.NODE_ENV || 'development';

module.exports = {
    development: {
        username: 'Johnny Cash',
        password: 'Something',
        url: 'something.mlab.com',
        port: '39648',
        db: 'book-trading-club-dev',
        secret: 'getyourownsecret'
    }
}[env];