import React, { useEffect, useState } from "react";
import {
  EventCommentInput,
  EventCommentPerson,
  EventReplyCommentWrapper,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  createReply,
  getReply,
  setReply,
} from "../../features/postReply/postReplySlice";
import { getAuthUser } from "../../utils/authStorage";

const EventReplyComment = ({ id }) => {
  const user = getAuthUser();
  const dispatch = useDispatch();
  const postReply = useSelector((state) => state.postReply.allReply) || {};

  useEffect(() => {
    dispatch(getReply(id));
    return () => {
      dispatch(setReply({}));
    };
  }, [dispatch, id]);

  const onPressEnter = (e) => {
    const content = e.target.value;
    const data = {
      idPost: id,
      idUser: user._id,
      text: content,
    };
    dispatch(createReply(data));
  };

  return (
    <EventReplyCommentWrapper>
      {postReply[id]?.map((reply) => (
        <EventCommentPerson style={{ margin: "1rem 0" }}>
          <div style={{ fontWeight: 700, marginRight: "1rem" }}>
            {reply.username}
          </div>
          <div>{reply.text}</div>
        </EventCommentPerson>
      ))}
      <EventCommentInput placeholder="Comment" onPressEnter={onPressEnter} />
    </EventReplyCommentWrapper>
  );
};

export default EventReplyComment;
