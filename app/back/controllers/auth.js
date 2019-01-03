const response = require('../components/response')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const jwtHelper = require('../components/jwtHelper')
const jwtKey = jwtHelper.getKey()
const sha1 = require('sha1')

exports.login = function (req, res) {
    let fetchedUser

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                fetchedUser = user
                return (sha1(req.body.password) == user.password)
            } else {
                console.log(req.body)
                return false;
            }
        })
        .then(authenticated => {
            if (authenticated) {
                const jwtToken = jwt.sign(
                    { email: fetchedUser.email, userId: fetchedUser._id },
                    jwtKey,
                    { expiresIn: "24h" }
                )
                return response.make(res, 200, {
                    userId: fetchedUser._id,
                    token: jwtToken,
                    expiresIn: "24 hours",
                }, 'User has been authenticated successfully.')
            } else {
                return response.make(res, 401, null, 'Email or password is incorrect.')
            }
        })
        .catch(err => {
            return response.make(res, 500, null, 'Server error')
        })
};