import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaCog,
  FaChartLine,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa"; // Import Font Awesome icons

const Sidebar = ({ setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen ${
        isCollapsed ? "w-20" : "w-68"
      } transition-width duration-300`}
    >
      <div className="p-3 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="!bg-gray-600 text-white !m-auto hover:bg-gray-500 hover:outline border-0"
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
              <FaTachometerAlt
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Thông tin tài khoản</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("users")}
            >
              <FaUser
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Quản lý tài khoản nhân viên</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("settings")}
            >
              <FaCog className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`} />
              {!isCollapsed && <a href="#">Quản lý danh mục món ăn</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("reports")}
            >
              <FaChartLine
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Quản lý món ăn</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("reports")}
            >
              <FaChartLine
                className={`m-auto ${!isCollapsed ? "!m-0 !mr-3" : ""}`}
              />
              {!isCollapsed && <a href="#">Quản lý đơn hàng</a>}
            </li>
            <li
              className="p-4 hover:bg-gray-700 transition duration-200 flex items-center"
              onClick={() => setActiveTab("reports")}
            >
              <FaChartLine
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
          {isCollapsed?(<button className="!bg-gray-600 text-white px-4"><FaSignOutAlt /></button>):(<button
            className='!bg-gray-600 text-white !m-auto hover:bg-gray-500 hover:outline border-0'>
            Đăng xuất
          </button>)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
