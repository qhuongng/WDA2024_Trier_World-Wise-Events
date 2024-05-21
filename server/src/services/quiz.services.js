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

module.exports = {addQuiz, getQuiz}