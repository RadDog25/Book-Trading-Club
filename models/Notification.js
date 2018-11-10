var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    new: {
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    getters: true
});

module.exports = mongoose.model('Notification', NotificationSchema);
