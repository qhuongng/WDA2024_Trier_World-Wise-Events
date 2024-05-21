const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
    idEvent: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: false })

module.exports = mongoose.model('Post', post);