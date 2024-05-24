import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../../utils/authStorage";
import {
  QuizEndTitle,
  QuizEndWrapper,
  QuizEndTopBar,
  QuizEndMessage,
  QuizEndStats,
  QuizEndCorrectCount,
  QuizEndTimeTaken,
  QuizEndScore,
  QuizEndMinorStats,
} from "./styles";
import QuizResultItem from "../../../components/QuizResultItem";
import { setItem } from "../../../features/event/eventSlice";

const QuizEnd = () => {
  const user = getAuthUser();
  const navigate = useNavigate();

  const { state } = useLocation();

  const mins = parseInt(state?.timeElapsed / 60);
  const secs = parseInt(state?.timeElapsed % 60);
  const score = parseInt(state?.score);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <QuizEndWrapper>
      <QuizEndTitle>Quiz: {state?.event} - Results</QuizEndTitle>
      <QuizEndTopBar>
        <QuizEndMessage>Well done! See your results below.</QuizEndMessage>
        <QuizEndStats>
          <QuizEndMinorStats>
            <QuizEndCorrectCount>{state?.count} / 15</QuizEndCorrectCount>
            <QuizEndTimeTaken>
              {mins}m {secs}s
            </QuizEndTimeTaken>
          </QuizEndMinorStats>
          <QuizEndScore>{score} pts</QuizEndScore>
        </QuizEndStats>
      </QuizEndTopBar>
      {state?.questions && state?.userAnswers ? (
        state?.questions.map((question, index) => (
          <QuizResultItem
            qaPair={question}
            answer={state?.userAnswers[index]}
          ></QuizResultItem>
        ))
      ) : (
        <></>
      )}
    </QuizEndWrapper>
  );
};

export default QuizEnd;
