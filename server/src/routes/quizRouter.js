const express = require('express');
const router = express.Router();
const {createQuiz,getQuiz} = require("../controller/quizController");

// for quiz
router.post("/createQuiz", createQuiz);
router.get("/getQuiz/:id", getQuiz); // get by id

// for quiz question
router.post("/createQuestion");
router.get("/getSingleQuestion/:id"); // get single question by questionID
router.get("/getQuestion/:quizID"); // get all question by quizID
// for quiz answer
router.post("/createResult/:id");
router.get("/getAllResult/:quizId");    // sort by point before sending result
router.get("/getSingleAnswer"); // maybe can get from req.user._id

module.exports = router;