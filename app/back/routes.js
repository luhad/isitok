const express = require('express')
const router = express.Router()
const jwtHelper = require('./components/jwtHelper')
const in_array = require('in_array')
const panelController = require('./controllers/panel')


// Require controller modules.
const authController = require("./controllers/auth")

// middleware authentication
router.use(function (req, res, next) {
    const protectedRoutes = []
    if (in_array(req.url, protectedRoutes)) {
        jwtHelper.checkAuth(req);
    }
    next()
});

// login
router.post('/login', authController.login);

// panel
router.get('/panel/list', panelController.list);
router.get('/panel/view/:id', panelController.view);

module.exports = router;