const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');


const adminSchema = Schema({
    login: { type: String, required: true },
    password: { type: String, required: true }
});
adminSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Admin', adminSchema);
