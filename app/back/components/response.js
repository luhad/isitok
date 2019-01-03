exports.make = function(res, status, data, message) {
    return res.status(status).json({
        message: message,
        data: data
    })
}