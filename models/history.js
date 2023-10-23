const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const historySchema = mongoose.Schema({
    date: { type: String, required: true },
    userId: { type: String },
    type: { type: String, required: true },
    ip: { type: String },
    info: { type: Object },
    outfo: { type: Object }
});

historySchema.plugin(uniqueValidator);

module.exports = mongoose.model('History', historySchema);