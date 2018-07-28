var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);