import React from "react";
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
  return (
    <QuizEndWrapper>
      <QuizEndBox>
        <QuizEndInfo>
          <QuizEndTitle>Quiz: Menton Lemon Festival</QuizEndTitle>
          <QuizEndSubtitle>10 questions • 20 minutes</QuizEndSubtitle>
          <QuizEndDesc>Let’s see how much you have learned about this festival. You will be able to see your results right after the quiz concludes, and if you do well enough, you will also be featured in the leaderboard for this quiz!</QuizEndDesc>
          <QuizEndButton>End</QuizEndButton>
        </QuizEndInfo>
        <QuizEndImage
          style={{
            backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/image/getImage/664b107058d7454bcf85acff`,
          }}
        />
      </QuizEndBox>
    </QuizEndWrapper>
  );
};

export default QuizEnd;
