import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import HeaderBar from "../components/Header/HeaderBar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useNotifications } from "../hooks";
import { Header } from "antd/es/layout/layout";
const { Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(true);

  useNotifications();

  return (
    <Layout hasSider className="box-content !h-full !w-full">
      <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
      <Layout
        style={{
          marginInlineStart: collapsed ? 80 : 200,
        }}
        className="box-content !h-full !min-h-screen transition-all duration-300"
      >
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            marginTop: 64, // Adjust based on the height of HeaderBar
            overflow: "auto",
            height: "calc(100vh - 64px)", // Adjust based on the height of HeaderBar
          }}
          className="m-5 flex bg-white"
        >
          <div className="flex-1">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
