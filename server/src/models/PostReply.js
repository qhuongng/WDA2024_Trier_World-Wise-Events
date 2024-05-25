const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostReply = new Schema({
    idPost: {
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
    }
}, { timestamps: true })

module.exports = mongoose.model('PostReply', PostReply);