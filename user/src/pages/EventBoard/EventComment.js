import React from "react";
import { EventCommentPerson, EventCommentWrapper, EventPost } from "./styles";
import { Image } from "antd";
import EventReplyComment from "./EventReplyComment";

const EventComment = ({ post }) => {
  return (
    <EventPost>
      <EventCommentWrapper>
        {post.image !== "" && post.image.length !== 0 && (
          <Image
            width={"100%"}
            src={`${process.env.REACT_APP_SERVER_API_URL}/image/getImage/${post.image}`}
          />
        )}
        <div className="text">{post.text}</div>
        <EventCommentPerson>
          <img src={`${post.avatar}`} alt="" />
          <div className="name">{post.username}</div>
        </EventCommentPerson>
      </EventCommentWrapper>
      <EventReplyComment id={post._id} />
    </EventPost>
  );
};

export default EventComment;
