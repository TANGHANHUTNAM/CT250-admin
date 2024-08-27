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
import { FaBowlFood } from "react-icons/fa6";// Import Font Awesome icons
import {BiSolidFoodMenu} from "react-icons/bi"
import { Link } from "react-router-dom";

const Sidebar = ({ setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen ${isCollapsed ? "w-20" : "w-68"
        } transition-width duration-300`}
    >
      <div className="p-3 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="!bg-gray-600 text-white !m-auto hover:bg-gray-500 hover:outline border-0 !p-4 rounded-md"
        >
          <FaBars className="text-white" />
        </button>
      </div>
      <div className="flex flex-col">
        <nav className="mt-5">
          <ul>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("dashboard")}
            >
              <FaUser
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Thông tin tài khoản</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("users")}
            >
              <FaUsers
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Quản lý tài khoản nhân viên</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("settings")}
            >
              <BiSolidFoodMenu className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`} />
              {!isCollapsed && <a href="#">Quản lý danh mục món ăn</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("reports")}
            >
              <FaBowlFood
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Quản lý món ăn</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("reports")}
            >
              <MdLocalShipping
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Quản lý đơn hàng</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("reports")}
            >
              <LiaFirstOrder
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Quản lý đặt bàn</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("reports")}
            >
              <FaChartLine
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Thống kê</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("settings")}
            >
              <FaCog className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`} />
              {!isCollapsed && <a href="#">Cài đặt</a>}
            </li>
          </ul>
        </nav>
        <div className="mt-24 p-4 hover:bg-gray-700 transition duration-200 flex items-center">
          <Link className="m-auto" to={"/login"}>
            <button className="!bg-gray-600 !text-white !p-4 rounded-md ">{isCollapsed ? <FaSignOutAlt /> : "Đăng Xuất"}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
