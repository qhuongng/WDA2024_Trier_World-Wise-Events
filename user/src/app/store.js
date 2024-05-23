import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import eventReducer from "../features/event/eventSlice";
import postReducer from "../features/post/postSlice";
import postReplyReducer from "../features/postReply/postReplySlice";
import quizReducer from "../features/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    post: postReducer,
    postReply: postReplyReducer,
    quiz: quizReducer,
  },
});
