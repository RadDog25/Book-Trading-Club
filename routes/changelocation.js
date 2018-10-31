var express = require('express');
var router = express.Router();
var passport = require('passport');
var FormErrors = require('../helpers/FormErrors.js');
var getUserData = require('../helpers/getUserData.js');

router.put('/', passport.authenticate('jwt', { session: false }), function(req, res) {

    var formErrors = new FormErrors(req, {
        requiredFields: [ 'location' ]
    });

    if( formErrors.any() ) {
        res
            .status(400)
            .send( formErrors.get() );
    } else {

        var user = req.user;
        user.location = req.body.location;
        user.save(function (err, updatedUser) {
            if (err) {
                console.log(err);
            } else {
                getUserData(updatedUser)
                    .then(userData => {
                        res.status(200).send(userData);
                    })
                    .catch(err => console.log(err));
            }
        });
    }
});

module.exports = router;