import React from "react";
import { useLocation } from "react-router-dom";
import {
  QuizEndBox,
  QuizEndTitle,
  QuizEndSubtitle,
  QuizEndWrapper,
  QuizEndInfo,
  QuizEndDesc,
  QuizEndButton,
  QuizEndImage
} from "./styles";

const QuizEnd = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <QuizEndWrapper>
      <QuizEndTitle>Quiz results</QuizEndTitle>
    </QuizEndWrapper>
  );
};

export default QuizEnd;
