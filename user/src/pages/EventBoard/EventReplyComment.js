import React, { useEffect, useState } from "react";
import {
  EventCommentPerson,
  EventReplyCommentWrapper,
  EventReplyInputGroup,
  EventReplyButton
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  createReply,
  getReply,
  setReply,
} from "../../features/postReply/postReplySlice";
import { getAuthUser } from "../../utils/authStorage";
import Input from "../../components/Input";
import { LoadingOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Spin, ConfigProvider } from "antd";

const EventReplyComment = ({ id }) => {
  const user = getAuthUser();
  const dispatch = useDispatch();
  const postReply = useSelector((state) => state.postReply.allReply) || {};
  const [commentContent, setCommentContent] = useState("");
  const isLoading = useSelector((state) => state.postReply.loading?.[id]) ?? false;

  useEffect(() => {
    dispatch(getReply(id));
    return () => {
      dispatch(setReply({}));
    };
  }, [dispatch, id]);

  const onPressEnter = (e) => {
    if (!user) return;
    setCommentContent(e.target.value);

    const data = {
      idPost: id,
      idUser: user._id,
      text: commentContent,
    };

    dispatch(
      createReply({
        ...data,
        user,
      })
    );

    setCommentContent("");
  };

  return (
    <EventReplyCommentWrapper>
      {isLoading && <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#bb0070"
          },
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36, marginTop: '3rem' }} spin />} />
      </ConfigProvider>
      }

      {postReply[id]?.map((reply) => (
        <EventCommentPerson style={{ margin: "1rem 0" }}>
          <div style={{ fontWeight: 700, marginRight: "1rem" }}>
            {reply.username}
          </div>
          <div>{reply.text}</div>
        </EventCommentPerson>
      ))}

      <EventReplyInputGroup>
        <Input
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Comment"
          onPressEnter={onPressEnter}
        />

        <EventReplyButton onClick={onPressEnter}>
          <ArrowRightOutlined />
        </EventReplyButton>
      </EventReplyInputGroup>

    </EventReplyCommentWrapper>
  );
};

export default EventReplyComment;
