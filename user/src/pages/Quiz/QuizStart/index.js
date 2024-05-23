import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneEvent } from "../../../features/event/eventSlice";
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
  const { id } = useParams();

  const dispatch = useDispatch();
  const item = useSelector((state) => state.event.singleEvent) || null;

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, [dispatch, id]);

  return (
    <QuizStartWrapper>
      <QuizStartBox>
        <QuizStartInfo>
          <QuizStartTitle>Quiz: {item.eventName}</QuizStartTitle>
          <QuizStartSubtitle>15 questions • 20 minutes</QuizStartSubtitle>
          <QuizStartDesc>Let’s see how much you have learned about this festival. You will be able to see your results right after the quiz concludes, and if you do well enough, you will also be featured in the leaderboard for this quiz!</QuizStartDesc>
          <QuizStartButton to={`./..`}>Start</QuizStartButton>
        </QuizStartInfo>
        <QuizStartImage
          style={{
            backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/image/getImage/${item.images[0]}`,
          }}
        />
      </QuizStartBox>
    </QuizStartWrapper>
  );
};

export default QuizStart;
