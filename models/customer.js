const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    validated: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: String, default: 'new' },
});
customerSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Customer', customerSchema);