import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Footer from "../Footer";

const MainLayout = ({ children }) => {
  return (
    <Layout hasSider="false">
      <Header />
      {children}
      <Outlet />
      <Footer />
    </Layout>
  );
};

export default MainLayout;
