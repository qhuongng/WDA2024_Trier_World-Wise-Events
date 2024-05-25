const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizQuestion = new Schema({
    idEvent: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    answers:[{
        type: String,
        required: true
    }]
})


module.exports = mongoose.model('QuizQuestion', QuizQuestion);