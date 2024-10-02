import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import HeaderBar from "../components/Header/HeaderBar";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";
const { Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout hasSider className="!w-full !h-full box-content">
      <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
      <Layout
        style={{
          marginInlineStart: collapsed ? 80 : 200,
        }}
        className="!h-full box-content duration-300 transition-all"
      >
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="m-5 !rounded-lg box-content min-h-screen bg-white">
          <div className="p-3">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
