var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    id: String,
    authors: Array,
    averageRating: Number,
    categories: Array,
    description: String,
    link: String,
    publishedDate: Date,
    publisher: String,
    ratingsCount: Number,
    thumbnail: String,
    title: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);