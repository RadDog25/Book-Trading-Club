var jwt = require('jsonwebtoken');
var config = require('../config');

function checkToken(req, res, next) {
    jwt.verify(req.cookies.token, config.secret, function(err, data) {
        if(err) {
            res
                .status(403)
                .send('Bad token');
        } else {
            next();
        }
    })
}

module.exports = checkToken;