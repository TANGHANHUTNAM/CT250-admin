import React, { useState } from "react";
import {
  FaUser,
  FaCog,
  FaChartLine,
  FaBars,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { LiaFirstOrder } from "react-icons/lia";
import { MdLocalShipping } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6"; // Import Font Awesome icons
import { BiSolidFoodMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

const Sidebar = ({ setActiveTab }) => {
  const { t } = useTranslation();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-bgPrimary text-white !h-full ${isCollapsed ? "w-16" : ""
        } transition-width duration-300`}
    >
      <div className={`flex items-center justify-between hover:bg-gray-500 transition duration-200 ${isCollapsed?"!py-2":"!p-3"}`}  onClick={toggleSidebar}>
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        )}
        <button
          
          className={`bg-bgTertiary text-white m-auto border-0 !p-4 rounded-md ${!isCollapsed?"!m-0":""}`}
        >
          <FaBars className="text-white" />
        </button>
      </div>
      <div className="flex flex-col !justify-between !content-between">
        <nav className="mt-5">
          <ul>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Thông tin tài khoản" : ""}
            >
              <li
                className="p-4 hover:bg-gray-700 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("dashboard")}
              >
                <FaUser
                  className={`w-5 h-5 m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : ""
                  }`}
                />

                {!isCollapsed && <Link to="#">Thông tin tài khoản</Link>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý tài khoản nhân viên" : ""}
            >
              <li
                className="p-4 hover:bg-gray-700 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("users")}
              >
                <FaUsers
                  className={`w-5 h-5 m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : ""
                  }`}
                />
                {!isCollapsed && (
                  <Link to="#">Quản lý tài khoản nhân viên</Link>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý danh mục món ăn" : ""}
            >
              <li
                className="p-4 hover:bg-gray-700 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("settings")}
              >
                <BiSolidFoodMenu
                  className={`w-5 h-5 m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : ""
                  }`}
                />
                {!isCollapsed && <Link to="#">Quản lý danh mục món ăn</Link>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý món ăn" : ""}
            >
              <li
                className="p-4 hover:bg-gray-700 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <FaBowlFood
                  className={`w-5 h-5 m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : ""
                  }`}
                />
                {!isCollapsed && <Link to="#">Quản lý món ăn</Link>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý đơn hàng" : ""}
            >
              <li
                className="p-4 hover:bg-gray-700 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <MdLocalShipping
                  className={`w-5 h-5 m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : ""
                  }`}
                />
                {!isCollapsed && <Link to="#">Quản lý đơn hàng</Link>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý đặt bàn" : ""}
            >
              <li
                className="p-4 hover:bg-gray-700 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <LiaFirstOrder
                  className={`w-5 h-5 m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : ""
                  }`}
                />
                {!isCollapsed && <Link to="#">Quản lý đặt bàn</Link>}
              </li>
            </Tooltip>
            <Tooltip placement="right" title={isCollapsed ? "Thống kê" : ""}>
              <li
                className="p-4 hover:bg-gray-700 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <FaChartLine
                  className={`w-5 h-5 m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : ""
                  }`}
                />
                {!isCollapsed && <Link to="#">Thống kê</Link>}
              </li>
            </Tooltip>
            <Tooltip placement="right" title={isCollapsed ? "Cài đặt" : ""}>
              <li
                className="p-4 hover:bg-gray-700 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("settings")}
              >
                <FaCog
                  className={`w-5 h-5 m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : ""
                  }`}
                />
                {!isCollapsed && <Link to="#">Cài đặt</Link>}
              </li>
            </Tooltip>
          </ul>
        </nav>
        <Tooltip placement="right" title={isCollapsed ? "Đăng xuất" : ""}>
          <div className="mt-24 p-4 hover:bg-gray-700 transition duration-200 flex items-center">
            <Link className="m-auto" to={"/login"}>
              <button className="!bg-gray-600 !text-white !px-4 !py-3 rounded-md ">
                {isCollapsed ? <FaSignOutAlt /> : "Đăng Xuất"}
              </button>
            </Link>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
