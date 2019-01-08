const response = require('../components/response')

/**
 * This API tests socket
 */
exports.sockettest = function (req, res) {
    // panel id
    panelId = "abc123";

    // get panel active user
    panelActiveUsers = req.io.sockets.adapter.rooms[panelId];

    // if panel has more than 0 active users we update panel data and emitt an event
    if (panelActiveUsers.length > 0) {
        req.io.sockets.in(panelId).emit('message', 'active users at this panel: ' + panelActiveUsers.length);
    }

    response.make(res, 200, panelActiveUsers, 'ok')
};