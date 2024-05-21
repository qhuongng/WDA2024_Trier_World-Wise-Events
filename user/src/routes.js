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
    key: "quiz",
    path: `/quiz`,
    title: "",
    Component: React.lazy(() => import("./pages/Quiz/QuizStart")),
  },
  {
    key: "quiz2",
    path: `/quiz2`,
    title: "",
    Component: React.lazy(() => import("./pages/Quiz/QuizMain")),
  },
  {
    key: "quiz3",
    path: `/quiz3`,
    title: "",
    Component: React.lazy(() => import("./pages/Quiz/QuizEnd")),
  },
];
