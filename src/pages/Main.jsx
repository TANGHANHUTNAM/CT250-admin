import React, { useEffect, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import HeaderBar from "../components/Header/HeaderBar";
import EmployeesList from "../components//Employee/EmployeesList";
import Settings from "../components/Dashboard/Settings";
import MyChart from "../components/Dashboard/Chart";
import OderLayout from "../layouts/OrderLayout";
import { useTranslation } from "react-i18next";
import Language from "../components/Language/Language";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserInfo from "../components/UserInfo/UserInfo";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import MenuLayout from "../layouts/MenuLayout";
import ReservationLayout from "../layouts/ReservationLayout";
const { Header, Sider, Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <UserInfo />;
      case "users":
        return <EmployeesList />;
      case "settings":
        return <Settings />;
      case "menu":
        return <MenuLayout />;
      case "oder":
        return <OderLayout />;
      case "reservation":
        return <ReservationLayout />;
      case "reports":
        return <MyChart />;
      default:
        return <UserInfo />;
    }
  };

  useEffect(() => {
    if (isAuth == false) {
      navigate("/login");
    }
  });

  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuth == false) {
      navigate("/login");
    }
  });
  return (
    <Layout className="!w-full !h-full box-content">
      <Sidebar
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        setActiveTab={setActiveTab}
      />
      <Layout className="!h-full box-content">
        <HeaderBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setActiveTab={setActiveTab}
        />
        <Content className="mx-12 mt-12 !rounded-lg box-content">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
