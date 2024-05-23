const express = require('express');
const router = express.Router();
const { createQuiz, getQuiz, createQuestion, getRandomListQuestion, getQuestion } = require("../controller/quizController");

// for quiz
router.post("/createQuiz", createQuiz);
router.get("/getQuiz/:id", getQuiz); // get by id

// for quiz question
router.post("/createQuestion", createQuestion);
router.get("/getSingleQuestion/:id", getQuestion); // get single question by questionID
router.get("/getListQuestions/:quizId", getRandomListQuestion); // get all question by quizID

// for quiz result
router.post("/createResult/:id"); // later add the req.user._id
router.get("/getAllResult/:quizId");    // sort by point before sending result
router.get("/getSingleAnswer"); // maybe can get from req.user._id

module.exports = router;