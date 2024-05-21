const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizQuestion = new Schema({
    idQuiz: {
        type: String,
        required: true
    },
    text: {
        type: String,
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