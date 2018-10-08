var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var TradeRequestSchema = new Schema({
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
    bookInstanceForOwner: {
        type: Schema.Types.ObjectId,
        ref: 'BookInstance',
        required: false
    },
    bookInstanceForRequester: {
        type: Schema.Types.ObjectId,
        ref: 'BookInstance',
        required: false
    },
    status: {
        type: String,
        enum: [
            'initiated',
            'declined',
            'accepted',
            'proposed'
        ],
        required: true,
        default: 'initiated'
    },
    lastActionWasRequester: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

TradeRequestSchema.plugin(deepPopulate);
module.exports = mongoose.model('TradeRequest', TradeRequestSchema);