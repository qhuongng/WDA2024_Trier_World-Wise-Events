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

const createQuestion = async (req,res,next) => {
    try {
        const {idQuiz, textQuestion, answerA, answerB, answerC, answerD, correctAnswer} = req.body;

        if(!idQuiz || !textQuestion || !answerA || !answerB || !answerC || !answerD || !correctAnswer) {
            throw new Error("Input is required");
        }
        const questionDetail = {
            idQuiz: idQuiz,
            text: textQuestion,
            correctAnswer: correctAnswer,
            answers: [answerA,answerB, answerC, answerD]
        }

        const newQuestion = await quizService.addQuestion(questionDetail);
        if(newQuestion) res.status(200).json(newQuestion);
    } catch (error) {
        next(error);
    }
}

const getQuestion = async(req,res,next) => {
    try {
        const questId = req.params.id;
        if(!questId) throw new Error("QuestId is required.");
        const question = await quizService.getQuestion(questId);

        res.status(200).json(question);
    } catch (error) {
        next(error);
    }
};

const getListQuestion = async (req,res,next) => {
    try {
        const quizId = req.params.quizId;
        if(!quizId) throw new Error("QuizId is required");

        const questions = await quizService.getListQuestion(quizId);
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
}

module.exports = {createQuiz,getQuiz, createQuestion, getQuestion, getListQuestion};