import React, { useEffect } from "react";
import { EventCommentPerson, EventReplyCommentWrapper } from "./styles";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getReply, setReply } from "../../features/postReply/postReplySlice";

const EventReplyComment = ({ id }) => {
  const dispatch = useDispatch();
  const postReply = useSelector((state) => state.postReply.allReply) || {};

  useEffect(() => {
    dispatch(getReply(id));
    return () => {
      dispatch(setReply({}));
    };
  }, [dispatch, id]);

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
      <Input placeholder="Comment" style={{ marginTop: "1rem" }} />
    </EventReplyCommentWrapper>
  );
};

export default EventReplyComment;
