const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: Number,
    name: String,
    country: String,
    city: String,
    text: String,
    imagePortraitUrl: String,
    imageFullUrl: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Coworker', schema);