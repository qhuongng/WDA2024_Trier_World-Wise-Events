import React, { useEffect } from "react";
import { EventCommentsListWrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, setPosts } from "../../features/post/postSlice";
import EventComment from "./EventComment";

const EventCommentsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.allPosts) || [];
  const item = useSelector((state) => state.event.singleEvent) || null;

  useEffect(() => {
    dispatch(setPosts([]));
    if (!item) {
      return;
    }
    dispatch(getAllPosts(item.id));
  }, [dispatch, item]);

  return (
    <EventCommentsListWrapper>
      {posts && posts.map((post) => <EventComment post={post} />)}
    </EventCommentsListWrapper>
  );
};

export default EventCommentsList;
