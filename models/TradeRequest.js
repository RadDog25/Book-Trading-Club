var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var TradeRequestSchema = new Schema({
    bookInstance: {
        type: Schema.Types.ObjectId,
        ref: 'BookInstance',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requester: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    proposedBookInstance: {
        type: Schema.Types.ObjectId,
        ref: 'BookInstance',
        required: false
    },
    status: {
        type: String,
        enum: ['open', 'cancelled', 'complete'],
        required: true,
        default: 'open'
    }
}, {
    timestamps: true
});

TradeRequestSchema.plugin(deepPopulate);
module.exports = mongoose.model('TradeRequest', TradeRequestSchema);