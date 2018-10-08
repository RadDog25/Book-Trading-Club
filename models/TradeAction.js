var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var TradeActionSchema = new Schema({
    tradeRequest: {
        type: Schema.Types.ObjectId,
        ref: 'TradeRequest',
        required: true
    },
    actor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        enum: [
            'initiate',
            'decline',
            'accept',
            'propose'
        ],
        required: true,
        default: 'initiate'
    },
    bookInstanceForRequester: {
        type: Schema.Types.ObjectId,
        ref: 'BookInstance',
        required: false
    },
    bookInstanceForOwner: {
        type: Schema.Types.ObjectId,
        ref: 'BookInstance',
        required: false
    }
}, {
    timestamps: true
});

TradeActionSchema.plugin(deepPopulate);
module.exports = mongoose.model('TradeAction', TradeActionSchema);