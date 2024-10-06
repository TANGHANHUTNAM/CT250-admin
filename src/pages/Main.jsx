import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import HeaderBar from "../components/Header/HeaderBar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useNotifications } from "../hooks";
const { Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(true);

  useNotifications();

  return (
    <Layout hasSider className="!w-full !h-full box-content">
      <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
      <Layout
        style={{
          marginInlineStart: collapsed ? 80 : 200,
        }}
        className="!h-full !min-h-screen box-content duration-300 transition-all"
      >
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="m-5 box-content min-h-[80vh] flex bg-white">
          <div className="flex-1">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
