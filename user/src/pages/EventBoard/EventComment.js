import React from "react";
import { EventCommentPerson, EventCommentWrapper, EventPost } from "./styles";
import { Image } from "antd";
import EventReplyComment from "./EventReplyComment";

const EventComment = ({ post }) => {
  return (
    <EventPost>
      <EventCommentWrapper>
        {post.image && (
          <Image
            width={"100%"}
            src={`http://localhost:3600/api/image/getImage/${post.image}`}
          />
        )}
        <div className="text">{post.text}</div>
        <EventCommentPerson>
          <img
            src={`http://localhost:3600/api/image/getImage/${post.avatar}`}
            alt=""
          />
          <div className="name">{post.username}</div>
        </EventCommentPerson>
      </EventCommentWrapper>
      <EventReplyComment id={post._id} />
    </EventPost>
  );
};

export default EventComment;
