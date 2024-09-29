import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { logoutSuccess } from "../../redux/reducer/userSlice";
import { logout } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import favicon from "../../assets/favicon.png";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import StatusCodes from "../../utils/StatusCodes";
import { Layout } from "antd";
import { RxDashboard } from "react-icons/rx";
import { MdTableRestaurant } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { FcStatistics } from "react-icons/fc";
import { MdDiscount } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import "./Sidebar.css";
import { IoMdStats } from "react-icons/io";

const { Sider } = Layout;
const Sidebar = ({ collapsed }) => {
  const { t } = useTranslation();
  const {
    account: { id, email, role },
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

  const menuItems = [
    {
      key: "/",
      icon: <RxDashboard className="w-4 h-4" />,
      label: (
        <Link to="/" className="text-base">
          Dashboard
        </Link>
      ),
    },
    {
      key: "/manage-statistical",
      icon: <IoMdStats className="w-4 h-4" />,
      label: (
        <Link to="/manage-statistical" className="text-base">
          Thống kê
        </Link>
      ),
    },
    {
      key: "/manage-emloyee",
      icon: <FaUsers className="w-4 h-4" />,
      label: (
        <Link to="/manage-emloyee" className="text-base">
          Nhân viên
        </Link>
      ),
    },
    {
      key: "/table-order",
      icon: <MdTableRestaurant className="w-4 h-4" />,
      label: (
        <Link to="/table-order" className="text-base">
          Đặt bàn
        </Link>
      ),
    },
    {
      key: "/dishes-order",
      icon: <TiShoppingCart className="w-4 h-4" />,
      label: (
        <Link to="/dishes-order" className="text-base">
          Đơn hàng
        </Link>
      ),
    },
    {
      key: "/manage-dishes",
      icon: <FaBowlFood className="w-4 h-4" />,
      label: (
        <Link to="/manage-dishes" className="text-base">
          Món ăn
        </Link>
      ),
    },
    {
      key: "/manage-discount",
      icon: <MdDiscount className="w-4 h-4" />,
      label: (
        <Link to="/manage-discount" className="text-base">
          Giảm giá
        </Link>
      ),
    },
    {
      key: "/manage-contact",
      icon: <MdPermContactCalendar className="w-4 h-4" />,
      label: (
        <Link to="/manage-contact" className="text-base">
          Liên hệ
        </Link>
      ),
    },
    {
      key: "/manage-news",
      icon: <IoNewspaper className="w-4 h-4" />,
      label: (
        <Link to="/manage-news" className="text-base">
          Tin tức
        </Link>
      ),
    },
    {
      key: "/logout",
      icon: <TbLogout2 onClick={() => handleLogout()} className="w-4 h-4" />,
      label: (
        <span onClick={() => handleLogout()} className="text-base">
          Đăng xuất
        </span>
      ),
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (
      role === "staff" &&
      (item.key === "/manage-statistical" || item.key === "/manage-emloyee")
    ) {
      return false;
    }
    return true;
  });
  return (
    <Sider
      trigger={null}
      style={{ minWidth: 150 }}
      collapsible
      collapsed={collapsed}
      className={`!bg-white  !flex-none ${
        !collapsed ? "!max-w-auto" : "!max-w-fit"
      } !min-w-14`}
    >
      {collapsed ? (
        <div className="p-3">
          <img
            src={favicon}
            className="demo-logo-vertical m-auto mt-2"
            alt="sada"
            width={45}
            height={45}
          />
        </div>
      ) : (
        <div className="p-3">
          <img src={logo} className="demo-logo-vertical m-auto w-full" alt="" />
        </div>
      )}
      <Menu
        className="font-medium"
        defaultSelectedKeys={["/"]}
        items={filteredMenuItems}
        selectedKeys={window.location.pathname}
      />
    </Sider>
  );
};

export default Sidebar;
