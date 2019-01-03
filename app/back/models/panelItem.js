const mongoose = require('mongoose')

const panelItemSchema = mongoose.Schema({
    panel: { type: Schema.Types.ObjectId, ref: 'panel' },
    name: { type: String, required: true },
    api_url: { type: String, required: true },
    api_authorization: { type: String, required: true },
    type: { type: String, required: true },
    last_update_data: { type: String, required: false },
    last_update_data_list: { type: String, required: false },
    last_update_date: { type: String, required: false },
    last_update_response: { type: String, required: false },
    last_update_message: { type: String, required: false },
    grid_size: { type: String, required: true },
})

panelItemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('PanelItem', panelItemSchema, 'panel_item')