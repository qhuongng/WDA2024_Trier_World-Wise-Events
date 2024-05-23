const quizService = require("../services/quiz.services");

//off
const createQuiz = async (req, res, next) => {
    try {
        const { idEvent } = req.body;

        const newQuiz = await quizService.addQuiz({ idEvent });
        res.status(200).json(newQuiz);
    } catch (error) {
        next(error);
    }
};
//off
const getQuiz = async (req, res, next) => {
    try {
        const eventId = req.params.id;

        if (!eventId) {
            throw new Error("ID Quiz is required.");
        }
        const quiz = await quizService.getQuiz(eventId);
        if (quiz) res.status(200).json(quiz);
    } catch (error) {
        next(error)
    }
}
//================================================================================================================================
const createQuestion = async (req, res, next) => {
    try {
        const { idEvent, textQuestion, answerA, answerB, answerC, answerD, correctAnswer } = req.body;

        if (!idEvent || !textQuestion || !answerA || !answerB || !answerC || !answerD || !correctAnswer) {
            throw new Error("Input is required");
        }
        const questionDetail = {
            idEvent: idEvent,
            text: textQuestion,
            correctAnswer: correctAnswer,
            answers: [answerA, answerB, answerC, answerD]
        }

        const newQuestion = await quizService.addQuestion(questionDetail);
        if (newQuestion) res.status(200).json(newQuestion);
    } catch (error) {
        next(error);
    }
}

const getQuestion = async (req, res, next) => {
    try {
        const questId = req.params.id;
        if (!questId) throw new Error("QuestId is required.");
        const question = await quizService.getQuestion(questId);

        res.status(200).json(question);
    } catch (error) {
        next(error);
    }
};

// get list question base on EventID
const getListQuestion = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        if (!quizId) throw new Error("EventID is required");

        const questions = await quizService.getListQuestion(quizId);
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
}

// get a list of 15 random questions
const getRandomListQuestion = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        if (!quizId) throw new Error("EventID is required");

        const questions = await quizService.getRandomListQuestion(quizId);
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
}

// create quiz result
const createResult = async (req, res, next) => {
    try {
        const { idUser, idEvent, score, time } = req.body;

        if (!idUser || !idEvent || score === null || !time) throw new Error("Input is required.");

        const resutData = {
            idUser: idUser,
            idEvent: idEvent,
            score: score,
            time: time
        };
        const result = await quizService.addResult(resutData);
        if (result) res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

// get list result base on eventID
const getListResult = async (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        if (!eventId) throw new Error("Event ID is required!");
        const liResult = await quizService.getListResult(eventId);

        if (liResult) res.status(200).json(liResult);
    } catch (error) {
        next(error);
    }
}

const getUserResult = async (req, res, next) => {
    try {
        const id = req.params.userId;
        if (!id) throw new Error("User ID is required!");

        const listResult = await quizService.getUserResult(id);
        if (listResult) res.status(200).json(listResult);
    } catch (error) {
        next(error)
    }
}

module.exports = { createQuiz, getQuiz, createQuestion, getQuestion, getListQuestion, createResult, getListResult, getUserResult, getRandomListQuestion };
