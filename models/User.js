var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Book = require('../models/Book.js');
var BookInstance = require('../models/BookInstance.js');
var TradeRequest = require('../models/TradeRequest.js');
var Notification = require('../models/Notification.js');
var userPropertiesToSend = require('../whitelists/user.js');
var bookPropertiesToSend = require('../whitelists/book.js');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false,
        default: 'Parts unknown'
    },
    avatar: {
        type: Number,
        required: false,
        default: 1
    }
}, {
    timestamps: true
});

UserSchema.methods.getProperties = function() {
    var properties = {};
    for(property of userPropertiesToSend) {
        properties[property] = this[property];
    }

    return properties;
}

UserSchema.methods.getBookInstances = function() {
    return BookInstance.find({ user: this._id })
        .select('book')
        .populate({ path: 'book', select: bookPropertiesToSend.join(' ') })
        .exec();
}

UserSchema.methods.getTradeRequests = function() {
    return TradeRequest.find()
        .or([{ owner: this._id }, { requester: this._id }])
        .populate([
            { path: 'owner', select: userPropertiesToSend.join(' ') },
            { path: 'requester', select: userPropertiesToSend.join(' ') },
        ])
        .deepPopulate(['bookInstanceForOwner.book', 'bookInstanceForRequester.book'])
        .exec();
}

UserSchema.methods.getNotifications = function () {
    return Notification.find({
        user: this._id
    });
}

UserSchema.methods.getData = function() {
    return Promise.all([
        this.getBookInstances(),
        this.getTradeRequests(),
        this.getNotifications(),
    ])
        .then(([bookInstances, tradeRequests, notifications] = data) => {
            return {
                ...this.getProperties(),
                bookInstances,
                tradeRequests,
                notifications
            }
        });
}

UserSchema.methods.getEmail = function() {
    return this.email;
}

UserSchema.methods.addBook = function(book) {

    var options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    };

    return Book.findOneAndUpdate({ id: book.id }, book, options)
        .exec()
        .then(newBook => {
            var bookInstance = new BookInstance({
                book: newBook._id,
                user: this._id
            });

            return bookInstance.save();
        });
}

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);