const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    name: {
        Type: String,
        required: true
    }
})

module.exports = mongoose.model('EventType', EventType);