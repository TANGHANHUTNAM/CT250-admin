import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import HeaderBar from "../components/Header/HeaderBar";
import HeaderBar from "../components/Header/HeaderBar";
import DashboardContent from "../components/Dashboard/DashboardContent";
import EmployeesList from "../components/Dashboard/Employee/EmployeesList";
import EmployeesList from "../components/Dashboard/Employee/EmployeesList";
import Settings from "../components/Dashboard/Settings";
import MyChart from "../components/Dashboard/Chart";
import { useTranslation } from "react-i18next";
import Language from "../components/Language/Language";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserInfo from "../components/Dashboard/UserInfo/UserInfo";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import Language from "../components/Language/Language";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserInfo from "../components/Dashboard/UserInfo/UserInfo";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [activeTab, setActiveTab] = useState("dashboard");

  const navigate = useNavigate();

  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <UserInfo />;
        return <UserInfo />;
      case "users":
        return <EmployeesList />;
        return <EmployeesList />;
      case "settings":
        return <Settings />;
      case "reports":
        return <MyChart />;
      default:
        return <DashboardContent />;
    }
  };

  const {
    isAuth,
  } = useSelector((state) => state.user);

  useEffect(() => {

    if (isAuth == false) {
      navigate("/login");
    }

  })

  const {
    isAuth,
  } = useSelector((state) => state.user);

  useEffect(() => {

    if (isAuth == false) {
      navigate("/login");
    }

  })
  return (
    // <div className="flex h-screen bg-gray-100 overflow-hidden">
    //   <Sidebar setActiveTab={setActiveTab} />
    //   <div className="flex-1 p-4 overflow-x-hidden overflow-y-auto scrollbar-w-thin">
    //     {renderContent()}
    //   </div>
    //   <Language />
    // </div>
    <Layout className="!w-full !h-full box-content">
      <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} setActiveTab={setActiveTab} />
      <Layout className="!h-full box-content">
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} setActiveTab={setActiveTab}/>
        <Content
          // style={{
          //   margin: '24px 16px',
          //   padding: 24,
          //   background: colorBgContainer,
          //   borderRadius: borderRadiusLG,
          // }}
          className="mx-12 mt-12 !rounded-lg box-content"
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>

  );
};

export default Dashboard;
