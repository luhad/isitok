const mongoose = require('mongoose')
const Schema = mongoose.Schema

const panelItemSchema = mongoose.Schema({
    panel_id: { type: Schema.Types.ObjectId, ref: 'panel' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    api_url: { type: String, required: true },
    api_authorization: { type: String, required: true },
    type: { type: String, required: true },
    last_update_data: { type: String },
    last_update_data_list: [
        {
            name: { type: String, required: true },
            description: { type: String },
            value: { type: String, required: true },
            has_problem: { type: Boolean, required: true },
        }
    ],
    last_update_date: { type: Date, required: Date.now },
    last_update_response: { type: String, required: false },
    last_update_message: { type: String, required: false },
})

module.exports = mongoose.model('PanelItem', panelItemSchema, 'panel_item')