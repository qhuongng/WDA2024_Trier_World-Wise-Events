import React from "react";
/*  file constants routes */

// constant main navigation
export const MAIN_NAVIGATION = [
  {
    key: "home",
    path: "/",
    title: "",
    Component: React.lazy(() => import("./pages/Home")),
  },
  {
    key: "login",
    path: "/login",
    title: "",
    Component: React.lazy(() => import("./pages/Login")),
  },
  {
    key: "register",
    path: "/register",
    title: "",
    Component: React.lazy(() => import("./pages/Register")),
  },
  {
    key: "profile",
    path: `/profile`,
    title: "",
    Component: React.lazy(() => import("./pages/Profile")),
  },
  {
    key: "events",
    path: `/events`,
    title: "",
    Component: React.lazy(() => import("./pages/AllEvents")),
  },
  {
    key: "quizstart",
    path: `/quiz/:id/intro`,
    title: "",
    Component: React.lazy(() => import("./pages/Quiz/QuizStart")),
  },
  {
    key: "quizmain",
    path: `/quiz/:id`,
    title: "",
    Component: React.lazy(() => import("./pages/Quiz/QuizMain")),
  },
  {
    key: "quizend",
    path: `/quiz/:id/results`,
    title: "",
    Component: React.lazy(() => import("./pages/Quiz/QuizEnd")),
  },
  {
    key: "events",
    path: `/events/:id`,
    title: "",
    Component: React.lazy(() => import("./pages/EventBoard")),
  },
];
