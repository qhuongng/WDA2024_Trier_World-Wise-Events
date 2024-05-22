import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import { Layout, Menu, ConfigProvider, Affix } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  PoweroffOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;

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
        <Affix style={{ position: 'sticky', top: 0, left: 0 }}>
          <div style={{ boxShadow: '0 0 7px 2px rgba(31, 0, 178, 0.2)' }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              theme={'light'}
              style={{ padding: 8, height: '100vh', overflow: 'auto', position: 'sticky', left: 0, top: 0 }}
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
          </div>
        </Affix>
      </ConfigProvider>

      <Layout style={{ flex: 1 }}>
        <Content style={{ overflow: "initial" }}>
          {children}
          <Outlet />
          <Footer />
        </Content>
      </Layout>
    </Layout >
  );
};

export default MainLayout;
