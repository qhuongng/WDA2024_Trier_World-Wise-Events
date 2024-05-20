const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    idPost: {
        Type: String,
        required: true
    },
    idUser: {
        Type: String,
        required: true
    },
    text: {
        Type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('PostReply', PostReply);