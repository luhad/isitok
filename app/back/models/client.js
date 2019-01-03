const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: false }
})

clientSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Client', clientSchema, 'client')