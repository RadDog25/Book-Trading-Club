var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;
var bookPropertiesToSend = require('../whitelists/book.js');

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
    ownerEmail: {
        type: String,
        required: false
    },
    requesterEmail: {
        type: String,
        required: false
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
    confirmedByOwner: {
        type: Boolean,
        required: true,
        default: false
    },
    confirmedByRequester: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        enum: [
            'initiated',
            'proposed',
            'accepted',
            'completed',
            'declined',
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

TradeRequestSchema.plugin(deepPopulate, {
    populate: {
        'bookInstanceForOwner.book': {
            select: bookPropertiesToSend.join(' ')
        },
        'bookInstanceForRequester.book': {
            select: bookPropertiesToSend.join(' ')
        }
    }
});

module.exports = mongoose.model('TradeRequest', TradeRequestSchema);