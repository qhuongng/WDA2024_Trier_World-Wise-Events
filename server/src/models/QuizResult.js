const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResult = new Schema({
    idQuiz: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required:true
    }
})


module.exports = mongoose.model('QuizResult', QuizResult);
