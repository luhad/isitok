const mongoose = require('mongoose')

const panelSchema = mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: false }
})

panelSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Panel', panelSchema, 'panel')