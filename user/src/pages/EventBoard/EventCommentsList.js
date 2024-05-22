import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuthUser } from "../../utils/authStorage";
import { EventCommentsListWrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features/post/postSlice";
import EventComment from "./EventComment";

const EventCommentsList = ({ item }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.allPosts) || null;

  useEffect(() => {
    dispatch(getAllPosts(item._id));
  }, [dispatch, item._id]);

  console.log(posts);

  return (
    <EventCommentsListWrapper>
      {posts && posts.map((item) => <EventComment item={item} />)}
    </EventCommentsListWrapper>
  );
};

export default EventCommentsList;
