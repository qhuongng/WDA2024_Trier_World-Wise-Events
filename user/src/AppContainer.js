import React, { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { MAIN_NAVIGATION } from "./routes";
import MainLayout from "./components/MainLayout";
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const AppContainer = () => {
  const RouteView = useCallback(
    (routeData, isChild = false) =>
      routeData.map(({ key, Component, path, routes }) => (
        <Route
          key={key}
          element={
            <Suspense>
              <Component />
            </Suspense>
          }
          path={path}
        >
          {routes && RouteView(routes, true)}
        </Route>
      )),
    []
  );

  return (
    <main>
      <Wrapper>
        <Routes>
          <Route element={<MainLayout />}>{RouteView(MAIN_NAVIGATION)}</Route>
        </Routes>
      </Wrapper>
    </main>
  );
};

export default AppContainer;
