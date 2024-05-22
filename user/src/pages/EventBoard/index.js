import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuthUser } from "../../utils/authStorage";
import { EventBoardWrapper } from "./styles";
import EventIntroduction from "./EventIntroduction";
import { useDispatch, useSelector } from "react-redux";
import { getOneEvent } from "../../features/event/eventSlice";
import EventCommentsList from "./EventCommentsList";
const EventBoard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.event.singleEvent) || null;

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, [dispatch, id]);

  return (
    <EventBoardWrapper>
      {item && (
        <>
          <EventIntroduction item={item} />
          <EventCommentsList item={item} />
        </>
      )}
    </EventBoardWrapper>
  );
};

export default EventBoard;
