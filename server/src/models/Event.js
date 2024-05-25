const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    eventName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: Array,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isOngoing: {
        type: Boolean,
        required: true
    }
}, { timestamps: false, toJSON: { virtuals: true } });

module.exports = mongoose.model('Event', event);