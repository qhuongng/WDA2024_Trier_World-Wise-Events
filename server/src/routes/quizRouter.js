const express = require("express");
const router = express.Router();
const {
  createQuiz,
  getQuiz,
  createQuestion,
  getListQuestion,
  getRandomListQuestion,
  getQuestion,
  createResult,
  getListResult,
  getUserResult,
} = require("../controller/quizController");

// for quiz
router.post("/createQuiz", createQuiz);
router.get("/getQuiz/:id", getQuiz); // get by id

// for quiz question
router.post("/createQuestion", createQuestion);
router.get("/getSingleQuestion/:id", getQuestion); // get single question by questionID
router.get("/getListQuestions/:quizId", getRandomListQuestion); // get all question by quizID

// for quiz result
router.post("/createResult", createResult); // adding the user id into bodt => req.user._id
router.get("/getListResult/:eventId", getListResult); // sort by time before sending result
router.get("/getUserResult/:userId", getUserResult); // maybe can get from req.user._id

module.exports = router;
