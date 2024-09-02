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
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { logoutSuccess } from "../../redux/reducer/userSlice";
import { logout } from "../../services/authService";
import Avatar from "../avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import StatusCodes from "../../utils/StatusCodes";

const Sidebar = ({ setActiveTab }) => {
  const { t } = useTranslation();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const {
    isAuth,
    account: { id, email, avatar, username, role },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logout({ id: id, email: email });

    if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
      toast.success(res.EM);
      dispatch(logoutSuccess());
      navigate("/login");
    }

    if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
      toast.error(res.EM);
    }
  };

  return (
    <div
      className={`bg-bgPrimary text-white !h-full ${
        isCollapsed ? "w-16" : ""
      } transition-width duration-300`}
    >
      <div
        className={`flex items-center justify-between transition duration-200 ${
          isCollapsed ? "!py-2" : "!p-3"
        }`}
      >
        {!isCollapsed ? (
          <div className="grid w-full">
            <div className="flex justify-between">
              <Avatar size={42} src={avatar}/>
              <button
                className={`bg-bgTertiary text-white m-auto border-0 !p-4 rounded-md hover:bg-gray-500 ${
                  !isCollapsed ? "!m-0" : ""
                }`}
                onClick={toggleSidebar}
              >
                <FaBars className="text-white" />
              </button>
            </div>
            <div className="flex flex-col mt-2">
              <p className="text-xl indent-1 italic font-medium">{username}</p>
              <p className="mt-2 indent-1">{t("Home.position")}: {role}</p>
            </div>
          </div>
        ) : (
          <button
            className={`bg-bgTertiary text-white m-auto border-0 !p-4 rounded-md hover:bg-gray-500${
              !isCollapsed ? "!m-0" : ""
            }`}
            onClick={toggleSidebar}
          >
            <FaBars className="text-white" />
          </button>
        )}
      </div>
      <div className="flex flex-col !justify-between !content-between">
        <nav className="mt-5">
          <ul>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Thông tin tài khoản" : ""}
            >
              <li
                className="p-4 hover:bg-gray-500 transition duration-200 flex items-center"
                onClick={() => setActiveTab("dashboard")}
              >
                <FaUser
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && <a>{t("Home.accountInfo")}</a>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý tài khoản nhân viên" : ""}
            >
              <li
                className="p-4 hover:bg-gray-500 transition duration-200 flex items-center"
                onClick={() => setActiveTab("users")}
              >
                <FaUsers
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && <a href="#">{t("Home.employeeManagement")}</a>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý danh mục món ăn" : ""}
            >
              <li
                className="p-4 hover:bg-gray-500 transition duration-200 flex items-center"
                onClick={() => setActiveTab("settings")}
              >
                <BiSolidFoodMenu
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && (
                  <a href="#">{t("Home.foodCategoryManagement")}</a>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý món ăn" : ""}
            >
              <li
                className="p-4 hover:bg-gray-500 transition duration-200 flex items-center"
                onClick={() => setActiveTab("reports")}
              >
                <FaBowlFood
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && <a href="#">{t("Home.dishManagement")}</a>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý đơn hàng" : ""}
            >
              <li
                className="p-4 hover:bg-gray-500 transition duration-200 flex items-center"
                onClick={() => setActiveTab("reports")}
              >
                <MdLocalShipping
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && <a href="#">{t("Home.orderManagement")}</a>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? "Quản lý đặt bàn" : ""}
            >
              <li
                className="p-4 hover:bg-gray-500 transition duration-200 flex items-center"
                onClick={() => setActiveTab("reports")}
              >
                <LiaFirstOrder
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && (
                  <a href="#">{t("Home.reservationManagement")}</a>
                )}
              </li>
            </Tooltip>
            <Tooltip placement="right" title={isCollapsed ? "Thống kê" : ""}>
              <li
                className="p-4 hover:bg-gray-500 transition duration-200 flex items-center"
                onClick={() => setActiveTab("reports")}
              >
                <FaChartLine
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && <a href="#">{t("Home.statistics")}</a>}
              </li>
            </Tooltip>
            <Tooltip placement="right" title={isCollapsed ? "Cài đặt" : ""}>
              <li
                className="p-4 hover:bg-gray-500 transition duration-200 flex items-center"
                onClick={() => setActiveTab("settings")}
              >
                <FaCog
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && <a href="#">{t("Home.setting")}</a>}
              </li>
            </Tooltip>
          </ul>
        </nav>
        <Tooltip placement="right" title={isCollapsed ? "Đăng xuất" : ""}>
          <div className="mt-auto py-2 hover:bg-gray-500 transition duration-200 flex items-center !mb-0">
            <div className="m-auto" to={"/login"}>
              <button
                className="!bg-bgTertiary !text-white !p-4 rounded-md "
                onClick={() => handleLogout()}
              >
                {isCollapsed ? <FaSignOutAlt /> : `${t("Home.logout")}`}
              </button>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
