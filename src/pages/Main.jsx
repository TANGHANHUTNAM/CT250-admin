import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import HeaderBar from "../components/Header/HeaderBar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useSSE } from "../hooks";
const { Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(true);

  useSSE();

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
            marginTop: 64,
            overflow: "auto",
            height: "calc(100vh - 90px)",
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
