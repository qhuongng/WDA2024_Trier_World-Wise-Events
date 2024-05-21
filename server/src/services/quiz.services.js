const Quiz = require("../models/quiz");
const QuizQuestion = require("../models/QuizQuestion");
const QuizResult = require("../models/QuizResult");
const Event = require("../models/Event");

// quiz
const addQuiz = async (quizDetail) => {
    try {
        const {idEvent} = quizDetail;
        console.log(idEvent);
        const event = await Event.findOne({_id: idEvent});

        if(!event) throw new Error("Event does not exist.");

        const isExist = await Quiz.findOne({idEvent})
        if(isExist) {
            throw new Error("Quiz alredy exists.");
        }
        const newQuiz = await Quiz.create({idEvent});
        return {data: newQuiz};
    } catch (error) {
        throw new Error(error);
    }
}

const getQuiz = async (id) => {
    try {
        const quiz = await Quiz.findOne({idEvent: id});
        if(!quiz) {
            throw new Error("Quiz does not exist.");
        }
        return quiz;
    } catch (error) {
        throw new Error(error);
    }
}
// quizQuestion
const addQuestion = async (questionDetail) => {
    try {
        const existedQuestion = await QuizQuestion.findOne({idQuiz: questionDetail.idQuiz, text: questionDetail.text});
        const quiz = await Quiz.findOne({_id: questionDetail.idQuiz});
        if(!quiz) throw new Error("Quiz does not exist!");
        if(existedQuestion) throw new Error("Question has already exist!");

        const newQuestion = await QuizQuestion.create(questionDetail);
        return {data: newQuestion};
    } catch (error) {
        throw new Error(error);
    }
}

const getQuestion = async(id) => {
    try {
        const question = QuizQuestion.findOne({_id: id});
        if(!question) throw new Error("Question does not exist.");

        return question;
    } catch (error) {
        throw new Error(error);
    }
}

const getListQuestion = async (id) => {
    try {
        const questions = QuizQuestion.find({idQuiz: id});
        if(!questions) throw new Error("Quiz does not exist.");

        return questions;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {addQuiz, getQuiz, addQuestion, getQuestion, getListQuestion}