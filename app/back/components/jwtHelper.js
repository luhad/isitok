const jwt = require("jsonwebtoken")
const jwtKey = 'FMfcgxwBTsgVCxMVfrfQwdZLkSVGkgSM'

exports.getKey = function () {
    return jwtKey;
}

exports.checkAuth = function (req) {
    try {
        return jwt.verify(req.headers.authorization, jwtKey)
    } catch (error) {
        throw 'Invalid token'
    }
}