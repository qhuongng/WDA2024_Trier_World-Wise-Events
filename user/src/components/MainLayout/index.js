import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import { Layout, Menu, ConfigProvider } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  PoweroffOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Home', '/', <HomeOutlined />),
  getItem('All Events', 'events', <CalendarOutlined />),
  getItem('My Account', 'profile', <UserOutlined />),
  getItem('Log out', 'signout', <PoweroffOutlined />),
];

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#2000bb',
            borderRadius: 12,
            colorBgContainer: '#ffffff',
            colorSplit: 'rgba(0,0,0,0)'
          },
        }}
      >

        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme={'light'}
          style={{ padding: 8, height: '100vh', overflow: 'auto', position: 'fixed', left: 0, zIndex: 10 }}
        >
          <div>
            <div className="logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
              <span className="sm-logo"
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => setCollapsed(!collapsed)}>
              </span>
              <span className="lg-logo">
                <h5
                  className="mb-0"
                  style={{
                    color: "#2000bb",
                    fontWeight: 700,
                    fontSize: "24px",
                    cursor: 'pointer'
                  }}
                  onClick={() => setCollapsed(!collapsed)}
                >
                  World-Wise Events
                </h5>
              </span>
            </div>

            <Menu
              defaultSelectedKeys={['/']}
              mode="inline"
              items={items}
              style={{ width: '100%' }}
              onClick={({ key }) => {
                if (key === "signout") {
                } else {
                  navigate(key);
                }
              }}
            />
          </div>
        </Sider>
      </ConfigProvider>

      <Layout style={{ flex: 1, marginLeft: '5.25%' }}>
        {children}
        <Outlet />
        <Footer />
      </Layout>
    </Layout >
  );
};

export default MainLayout;
