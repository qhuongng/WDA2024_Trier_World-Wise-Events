const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    idEvent: {
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
    },
    image: [{
        data: {
            type: Buffer,
            required: true      
            },        
        contentType: {
            type: String,
            required: true
            }
    }]
}, { timestamps: false })

module.exports = mongoose.model('Post', post);