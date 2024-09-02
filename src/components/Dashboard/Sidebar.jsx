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
import { useTranslation } from "react-i18next";

const Sidebar = ({ setActiveTab }) => {
  const { t } = useTranslation();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`z-50 bg-bgPrimary text-white !h-full overflow-x-hidden overflow-y-auto scrollbar-w-thin ${
        isCollapsed ? "w-20" : "w-[22rem]"
      } transition-width duration-300`}
    >
      <div
        className={`flex items-center justify-between hover:bg-bgTertiary group transition duration-200 sticky top-0 bg-bgPrimary z-10 ${
          isCollapsed ? "!py-2" : "!p-3"
        }`}
        onClick={toggleSidebar}
      >
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        )}
        <button
          className={`bg-bgTertiary text-white m-auto border-0 !p-4 rounded-md group-hover:bg-bgPrimary ${
            !isCollapsed ? "!m-0" : ""
          }`}
        >
          <FaBars className="text-white" />
        </button>
      </div>
      <div className="flex flex-col !justify-between !content-between">
        <nav className="mt-5">
          <ul>
            <Tooltip
              placement="right"
              title={isCollapsed ? t("Home.accountInfo") : ""}
            >
              <li
                className="p-4 hover:bg-bgTertiary transition duration-200 flex items-center cursor-pointer"
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
              title={isCollapsed ? t("Home.employeeManagement") : ""}
            >
              <li
                className="p-4 hover:bg-bgTertiary transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("users")}
              >
                <FaUsers
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && (
                  <Link to="#">{t("Home.employeeManagement")}</Link>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? t("Home.foodCategoryManagement") : ""}
            >
              <li
                className="p-4 hover:bg-bgTertiary transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("settings")}
              >
                <BiSolidFoodMenu
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && (
                  <Link to="#">{t("Home.foodCategoryManagement")}</Link>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? t("Home.dishManagement") : ""}
            >
              <li
                className="p-4 hover:bg-bgTertiary transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <FaBowlFood
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && <Link to="#">{t("Home.dishManagement")}</Link>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? t("Home.orderManagement") : ""}
            >
              <li
                className="p-4 hover:bg-bgTertiary transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <MdLocalShipping
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && (
                  <Link to="#">{t("Home.orderManagement")}</Link>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? t("Home.reservationManagement") : ""}
            >
              <li
                className="p-4 hover:bg-bgTertiary transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <LiaFirstOrder
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && (
                  <Link to="#">{t("Home.reservationManagement")}</Link>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? t("Home.statistics") : ""}
            >
              <li
                className="p-4 hover:bg-bgTertiary transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <FaChartLine
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && <Link to="#">{t("Home.statistics")}</Link>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={isCollapsed ? t("Home.setting") : ""}
            >
              <li
                className="p-4 hover:bg-bgTertiary transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("settings")}
              >
                <FaCog
                  className={`m-auto ${
                    !isCollapsed ? "!m-0 !mr-3" : "text-2xl"
                  }`}
                />
                {!isCollapsed && <Link to="#">{t("Home.setting")}</Link>}
              </li>
            </Tooltip>
          </ul>
        </nav>
        <Tooltip placement="right" title={isCollapsed ? t("Home.logout") : ""}>
          <div className="mt-auto py-2 hover:bg-bgTertiary group transition duration-200 flex items-center !mb-0">
            <Link className="m-auto" to={"/login"}>
              <button className="!bg-bgTertiary !text-white !p-4 rounded-md group-hover:!bg-bgPrimary">
                {isCollapsed ? <FaSignOutAlt /> : `${t("Home.logout")}`}
              </button>
            </Link>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
