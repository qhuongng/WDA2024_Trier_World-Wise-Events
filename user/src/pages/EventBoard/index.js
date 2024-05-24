import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventBoardWrapper, EventCreatePostButton } from "./styles";
import EventIntroduction from "./EventIntroduction";
import EventCommentsList from "./EventCommentsList";
import { useDispatch } from "react-redux";
import { getOneEvent } from "../../features/event/eventSlice";
import { setItem } from "../../features/event/eventSlice";
import { Affix } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
      <Affix
        offsetTop={100}
        style={{ position: "absolute", top: "70%", right: 50 }}
      >
        <EventCreatePostButton type="primary" icon={<PlusOutlined />} />
      </Affix>
    </EventBoardWrapper>
  );
};

export default EventBoard;
