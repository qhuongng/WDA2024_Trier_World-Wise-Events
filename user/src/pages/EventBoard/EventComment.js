import React from "react";
import { EventCommentPerson, EventCommentWrapper } from "./styles";
import { Image } from "antd";

const EventComment = ({ item }) => {
  return (
    <EventCommentWrapper>
      {item.image && (
        <Image
          width={"100%"}
          src={`http://localhost:3600/api/image/getImage/${item.image}`}
        />
      )}
      <div className="text">{item.text}</div>
      <EventCommentPerson>
        <img
          src={`http://localhost:3600/api/image/getImage/${item.avatar}`}
          alt=""
        />
        <div className="name">{item.username}</div>
      </EventCommentPerson>
    </EventCommentWrapper>
  );
};

export default EventComment;
