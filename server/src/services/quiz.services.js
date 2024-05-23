const Quiz = require("../models/quiz");
const QuizQuestion = require("../models/QuizQuestion");
const QuizResult = require("../models/QuizResult");
const Event = require("../models/Event");
const User = require("../models/user");

// quiz
const addQuiz = async (quizDetail) => {
  try {
    const { idEvent } = quizDetail;
    console.log(idEvent);
    const event = await Event.findOne({ _id: idEvent });

    if (!event) throw new Error("Event does not exist.");

    const isExist = await Quiz.findOne({ idEvent });
    if (isExist) {
      throw new Error("Quiz alredy exists.");
    }
    const newQuiz = await Quiz.create({ idEvent });
    return { data: newQuiz };
  } catch (error) {
    throw new Error(error);
  }
};
//off
const getQuiz = async (id) => {
  try {
    const quiz = await Quiz.findOne({ idEvent: id });
    if (!quiz) {
      throw new Error("Quiz does not exist.");
    }
    return quiz;
  } catch (error) {
    throw new Error(error);
  }
};
// quizQuestion
const addQuestion = async (questionDetail) => {
  try {
    const existedQuestion = await QuizQuestion.findOne({
      idQuiz: questionDetail.idQuiz,
      text: questionDetail.text,
    });
    const event = await Event.findOne({ _id: questionDetail.idEvent });
    if (!event) throw new Error("Event does not exist!");
    if (existedQuestion) throw new Error("Question has already exist!");

    const newQuestion = await QuizQuestion.create(questionDetail);
    return { data: newQuestion };
  } catch (error) {
    throw new Error(error);
  }
};

const getQuestion = async (id) => {
  try {
    const question = await QuizQuestion.findOne({ _id: id });
    if (!question) throw new Error("Question does not exist.");

    return question;
  } catch (error) {
    throw new Error(error);
  }
};

const getListQuestion = async (id) => {
  try {
    const event = await Event.findById(id);
    if (!event) throw new Error("Event does not exist.");
    const questions = await QuizQuestion.find({ idEvent: id });

    return questions;
  } catch (error) {
    throw new Error(error);
  }
};

// quiz result
const addResult = async (resultDetail) => {
  try {
    const user = await User.findById(resultDetail.idUser);
    const event = await Event.findById(resultDetail.idEvent);
    if (!user || !event) {
      throw new Error("User or Event not Exists!");
    }

    const result = await QuizResult.create(resultDetail);
    return { data: result };
  } catch (error) {
    throw new Error(error);
  }
};

const getListResult = async (id) => {
  try {
    const event = await Event.findById(id);
    if (!event) throw new Error("Event not Exists");
    const results = await QuizResult.find({ idEvent: id }).sort({
      score: -1,
      time: 1,
    });
    const data = await Promise.all(
      results.map(async (result) => {
        const user = await User.findById(result.idUser);
        return {
          ...result.toObject(),
          username: user.username,
          avatar: user.avatar,
        };
      })
    );

    return { data: data };
  } catch (error) {
    throw new Error(error);
  }
};

// shuffles the questions fetched and return the first 15
const getRandomListQuestion = async (id) => {
  try {
    const event = await Event.findById(id);
    if (!event) throw new Error("Event does not exist.");

    const questions = await QuizQuestion.find({ idEvent: id });

    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return questions.slice(0, 15);
  } catch (error) {
    throw new Error(error.message || error);
  }
};

module.exports = {
  addQuiz,
  getQuiz,
  addQuestion,
  getQuestion,
  getListQuestion,
  addResult,
  getListResult,
  getRandomListQuestion,
};
