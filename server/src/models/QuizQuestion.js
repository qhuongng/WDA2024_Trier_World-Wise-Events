const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    idQuiz: {
        Type: String,
        required: true
    },
    text: {
        Type: String,
        required: true
    },
    correctAnswer: {
        type: Boolean,
        required: true
    },
    answers:[{
        type: String,
        required: true
    }]
})


module.exports = mongoose.model('QuizQuestion', QuizQuestion);