import React from "react";
import { useLocation } from "react-router-dom";
import {
  QuizEndTitle,
  QuizEndWrapper,
  QuizEndTopBar,
  QuizEndMessage,
  QuizEndStats,
  QuizEndCorrectCount,
  QuizEndTimeTaken,
  QuizEndScore,
  QuizEndMinorStats
} from "./styles";
import QuizResultItem from "../../../components/QuizResultItem";

const QuizEnd = () => {
  const { state } = useLocation();

  const mins = parseInt(state.timeElapsed / 60);
  const secs = parseInt(state.timeElapsed % 60);
  const score = parseInt(state.score);

  console.log(state);

  return (
    <QuizEndWrapper>
      <QuizEndTitle>Quiz: {state.event} - Results</QuizEndTitle>
      <QuizEndTopBar>
        <QuizEndMessage>Well done! See your results below.</QuizEndMessage>
        <QuizEndStats>
          <QuizEndMinorStats>
            <QuizEndCorrectCount>{state.count} / 15</QuizEndCorrectCount>
            <QuizEndTimeTaken>{mins}m {secs}s</QuizEndTimeTaken>
          </QuizEndMinorStats>
          <QuizEndScore>{score} pts</QuizEndScore>
        </QuizEndStats>
      </QuizEndTopBar>
      {state.questions && state.userAnswers ?
        state.questions.map((question, index) =>
          <QuizResultItem qaPair={question} answer={state.userAnswers[index]}></QuizResultItem>
        ) :
        <></>}
    </QuizEndWrapper >
  );
};

export default QuizEnd;
