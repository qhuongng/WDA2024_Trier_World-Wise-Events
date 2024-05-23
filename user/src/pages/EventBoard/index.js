import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventBoardWrapper } from "./styles";
import EventIntroduction from "./EventIntroduction";
import EventCommentsList from "./EventCommentsList";
import { useDispatch } from "react-redux";
import { getOneEvent } from "../../features/event/eventSlice";
import { setPosts } from "../../features/post/postSlice";
import { setItem } from "../../features/event/eventSlice";

const EventBoard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneEvent(id));
    return () => {
      dispatch(setItem());
    };
  }, [dispatch, id]);

  return (
    <EventBoardWrapper>
      <EventIntroduction />
      <EventCommentsList />
    </EventBoardWrapper>
  );
};

export default EventBoard;
