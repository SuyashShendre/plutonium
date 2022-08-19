const mongoose = require('mongoose');

const newAuthor = new mongoose.Schema({
    authorName: String,
    age: Number,
    address: String,
    rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Author', newAuthor)
