const response = require('../components/response')
const panel = require('../models/panel')
const panelItem = require('../models/panelItem')
const request = require('request')

/**
 * This API returns a list of panels
 */
exports.list = function (req, res) {
    // find panels and return results
    panel
        .find()
        .then((docs) => {
            // returns the result once the docs are found
            var msg = 'You have not created a panel yet.'
            if (docs.length > 0) {
                msg = 'Panels are listed at "data" property.'
            }
            return response.make(res, 200, docs, msg)
        }).catch(err => {
            // returns a generic error message
            console.log(err)
            return response.make(res, 500, '', 'Internal server error')
        })
};

/**
 * This API returns data from a panel
 */
exports.view = function (req, res) {
    // get panel data
    panelItem
        .find({ panel_id: req.params.id }).sort({ order: 1 })
        .then(async (docs) => {
            if (docs.length > 0) {

                // panel data structure
                var panelDataStructure = {}

                // interact panel's items
                // each item has an api that will be requested above
                // the script will not wait the apis returns to make a response
                // a response with the panel's data strucure will be given first
                // every time an api responds an event will be emitted
                docs.forEach(function (panelItemSchema, index) {
                    request(panelItemSchema.api_url, function (error, response, body) {

                        if (!error && response.statusCode == 200) {
                            // TODO: setup socket and emmit event
                            console.log(panelItemSchema.name + ' worked')
                        } else {
                            // TODO: setup socket and emmit event
                            console.log(panelItemSchema.name + ' didnt worked')
                        }

                    })
                })

                // setup panel data structure
                await Promise.all(docs.map(async panelItemSchema => {
                    panelDataStructure[panelItemSchema.id] = {
                        id: panelItemSchema.id,
                        name: panelItemSchema.name,
                        description: panelItemSchema.description,
                        type: panelItemSchema.type
                    }
                }))

                // returns data structure to be displayed
                var msg = 'Panel data is at "data" property.'
                return response.make(res, 200, panelDataStructure, msg)

            } else {
                // returns not found message
                var msg = 'You have not created data for this panel yet.'
                return response.make(res, 404, [], msg)
            }

        }).catch(err => {
            // returns a generic error message
            console.log(err)
            return response.make(res, 500, '', 'Internal server error')
        })
};