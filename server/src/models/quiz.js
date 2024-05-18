const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quiz = new Schema({
    idEvent: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Quiz', quiz);