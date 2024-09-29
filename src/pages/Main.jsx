import { useEffect, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import HeaderBar from "../components/Header/HeaderBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "antd";
const { Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth == false) {
      navigate("/login");
    }
  });

  const { isAuth } = useSelector((state) => state.user);
  return (
    <Layout className="!w-full !h-full box-content">
      <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
      <Layout className="!h-full box-content">
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
