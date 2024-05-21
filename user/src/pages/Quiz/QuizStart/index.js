import React from "react";
import {
  QuizStartBox,
  QuizStartTitle,
  QuizStartSubtitle,
  QuizStartWrapper,
  QuizStartInfo,
  QuizStartDesc,
  QuizStartButton,
  QuizStartImage
} from "./styles";

const QuizStart = () => {
  return (
    <QuizStartWrapper>
      <QuizStartBox>
        <QuizStartInfo>
          <QuizStartTitle>Quiz: Menton Lemon Festival</QuizStartTitle>
          <QuizStartSubtitle>10 questions • 20 minutes</QuizStartSubtitle>
          <QuizStartDesc>Let’s see how much you have learned about this festival. You will be able to see your results right after the quiz concludes, and if you do well enough, you will also be featured in the leaderboard for this quiz!</QuizStartDesc>
          <QuizStartButton>Start</QuizStartButton>
        </QuizStartInfo>
        <QuizStartImage
          style={{
            backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/image/getImage/664b107058d7454bcf85acff`,
          }}
        />
      </QuizStartBox>
    </QuizStartWrapper>
  );
};

export default QuizStart;
