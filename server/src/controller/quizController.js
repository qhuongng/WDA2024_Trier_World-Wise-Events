const quizService = require("../services/quiz.services");


const createQuiz = async (req,res,next) => {
    try {
        const {idEvent} = req.body;

        const newQuiz = await quizService.addQuiz({idEvent});
        res.status(200).json(newQuiz);
    } catch (error) {
        next(error);
    }
};

const getQuiz = async (req,res,next) => {
    try {
        const eventId = req.params.id;

        if(!eventId) {
            throw new Error("ID Quiz is required.");
        }
        const quiz = await quizService.getQuiz(eventId);
        if(quiz) res.status(200).json(quiz);
    } catch (error) {
        next(error)
    }
}

module.exports = {createQuiz,getQuiz};