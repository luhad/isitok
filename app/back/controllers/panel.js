const response = require('../components/response')
const panel = require('../models/panel')

/**
 * This API returns a list of panels
 */
exports.list = function (req, res) {
    // find panels and return results
    panel
        .find()
        .then((docs) => {
            // returns the result once the docs are found
            var msg = docs ? 'Panels are listed at "data" property.' : 'You have not created a panel yet.';
            return response.make(res, 200, docs, msg)
        }).catch(err => {
            // returns a generic error message
            console.log(err)
            return response.make(res, 500, '', 'Internal server error')
        })
};