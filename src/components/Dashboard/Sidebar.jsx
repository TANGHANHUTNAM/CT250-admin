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
import { useDispatch, useSelector } from "react-redux";
import favicon from "../../assets/favicon.png"
import logo from "../../assets/logo.png"
import { toast } from "react-toastify";
import StatusCodes from "../../utils/StatusCodes";
import { Layout } from 'antd';
const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed, setActiveTab }) => {
  const { t } = useTranslation();
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
    <Sider trigger={null} collapsible collapsed={collapsed} className={`!bg-white !flex-none ${!collapsed ? "!max-w-auto" : "!max-w-fit"} !min-w-14`}>

      {collapsed ? <div ><img src={favicon} className="demo-logo-vertical m-auto mt-2" alt="sada" width={45} height={45} /></div> : <div ><img src={logo} className="demo-logo-vertical ml-3 mt-2" alt="sada" width={130} /></div>}

      <div className="grid">
        <nav className="mt-8 row-start-1">
          <ul>
            <Tooltip
              placement="right"
              title={collapsed ? t("Home.employeeManagement") : ""}
            >
              <li
                className="p-4 px-2 hover:!bg-gray-300 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("users")}
              >
                <FaUsers
                  className={`m-auto ${!collapsed ? "!m-0 !mr-3" : "text-lg !my-1"
                    }`}
                />
                {!collapsed && (
                  <Link to="#" className="hover:!text-black text-md">{t("Home.employeeManagement")}</Link>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={collapsed ? t("Home.foodCategoryManagement") : ""}
            >
              <li
                className="p-4 px-2 hover:!bg-gray-300 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("menu")}
              >
                <BiSolidFoodMenu
                  className={`m-auto ${!collapsed ? "!m-0 !mr-3" : "text-lg !my-1"
                    }`}
                />
                {!collapsed && (
                  <Link to="#" className="hover:!text-black text-md">{t("Home.foodCategoryManagement")}</Link>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={collapsed ? t("Home.dishManagement") : ""}
            >
              <li
                className="p-4 px-2 hover:!bg-gray-300 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <FaBowlFood
                  className={`m-auto ${!collapsed ? "!m-0 !mr-3" : "text-lg !my-1"
                    }`}
                />
                {!collapsed && <Link to="#" className="hover:!text-black text-md">{t("Home.dishManagement")}</Link>}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={collapsed ? t("Home.orderManagement") : ""}
            >
              <li
                className="p-4 px-2 hover:!bg-gray-300 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("oder")}
              >
                <MdLocalShipping
                  className={`m-auto ${!collapsed ? "!m-0 !mr-3" : "text-lg !my-1"
                    }`}
                />
                {!collapsed && (
                  <Link to="#" className="hover:!text-black text-md">{t("Home.orderManagement")}</Link>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={collapsed ? t("Home.reservationManagement") : ""}
            >
              <li
                className="p-4 px-2 hover:!bg-gray-300 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <LiaFirstOrder
                  className={`m-auto ${!collapsed ? "!m-0 !mr-3" : "text-lg !my-1"
                    }`}
                />
                {!collapsed && (
                  <Link to="#" className="hover:!text-black text-md">{t("Home.reservationManagement")}</Link>
                )}
              </li>
            </Tooltip>
            <Tooltip
              placement="right"
              title={collapsed ? t("Home.statistics") : ""}
            >
              <li
                className="p-4 px-2 hover:!bg-gray-300 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <FaChartLine
                  className={`m-auto ${!collapsed ? "!m-0 !mr-3" : "text-lg !my-1"
                    }`}
                />
                {!collapsed && <Link to="#" className="hover:!text-black text-md">{t("Home.statistics")}</Link>}
              </li>
            </Tooltip>
          </ul>
        </nav>
        <div to={"/login"}>
          <Tooltip
            placement="right"
            title={collapsed ? t("Home.logout") : ""}
          >
            <li
              className="p-4 px-2 hover:!bg-gray-300 transition duration-200 flex items-center cursor-pointer"
              onClick={() => handleLogout()}
            >
              <FaSignOutAlt
                className={`m-auto ${!collapsed ? "!m-0 !mr-3" : "text-lg !my-1"
                  }`}
              />
              {!collapsed && <Link to="#" className="hover:!text-black !text-md">{t("Home.logout")}</Link>}
            </li>
          </Tooltip>
        </div>
      </div>
    </Sider >
  );
};

export default Sidebar;
