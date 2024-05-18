const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    eventName: {
        type: String,
        required: true
    },
    idType: {
        type: String,
        require: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
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
    images: [{
        data: {
            type: Buffer,
            required: true      
            },        
        contentType: {
            type: String,
            required: true
            }
    }],
    description: { 
        type: String,
        required: true
    },
    isOngoing: {
        type: Boolean,
        required: true
    }
}, { timestamps: false });

module.exports = mongoose.model('Event', event);