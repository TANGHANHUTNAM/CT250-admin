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
import { MdDiscount } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { IoMdStats } from "react-icons/io";
import { FaUsersGear } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { PiDeviceTabletSpeakerFill } from "react-icons/pi";
import { BiSolidFoodMenu } from "react-icons/bi";

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
      icon: <RxDashboard className="h-4 w-4" />,
      label: (
        <Link to="/" className="text-sm">
          Dashboard
        </Link>
      ),
    },
    {
      key: "/manage-statistical",
      icon: <IoMdStats className="h-4 w-4" />,
      label: (
        <Link to="/manage-statistical" className="text-sm">
          Thống kê
        </Link>
      ),
    },
    {
      key: "/manage-emloyee",
      icon: <FaUsersGear className="h-4 w-4" />,
      label: (
        <Link to="/manage-emloyee" className="text-sm">
          Nhân viên
        </Link>
      ),
    },
    {
      key: "/manage-customer",
      icon: <FaUserTie className="h-4 w-4" />,
      label: (
        <Link to="/manage-customer" className="text-sm">
          Khách hàng
        </Link>
      ),
    },
    {
      key: "/table-order",
      icon: <PiDeviceTabletSpeakerFill className="h-4 w-4" />,
      label: (
        <Link to="/table-order" className="text-sm">
          Đơn đặt bàn
        </Link>
      ),
    },
    {
      key: "/manage-table",
      icon: <MdTableRestaurant className="h-4 w-4" />,
      label: (
        <Link to="/manage-table" className="text-sm">
          Quản lý bàn
        </Link>
      ),
    },
    {
      key: "/dishes-order",
      icon: <TiShoppingCart className="h-4 w-4" />,
      label: (
        <Link to="/dishes-order" className="text-sm">
          Đơn hàng
        </Link>
      ),
    },
    {
      key: "/manage-dishes",
      icon: <FaBowlFood className="h-4 w-4" />,
      label: (
        <Link to="/manage-dishes" className="text-sm">
          Quản lý món ăn
        </Link>
      ),
    },
    {
      key: "/manage-category",
      icon: <BiSolidFoodMenu className="h-4 w-4" />,
      label: (
        <Link to="/manage-category" className="text-sm">
          Quản lý danh mục
        </Link>
      ),
    },
    {
      key: "/manage-discount",
      icon: <MdDiscount className="h-4 w-4" />,
      label: (
        <Link to="/manage-discount" className="text-sm">
          Giảm giá
        </Link>
      ),
    },
    {
      key: "/manage-contact",
      icon: <MdPermContactCalendar className="h-4 w-4" />,
      label: (
        <Link to="/manage-contact" className="text-sm">
          Liên hệ
        </Link>
      ),
    },
    {
      key: "/manage-news",
      icon: <IoNewspaper className="h-4 w-4" />,
      label: (
        <Link to="/manage-news" className="text-sm">
          Tin tức
        </Link>
      ),
    },
    {
      key: "/logout",
      icon: <TbLogout2 onClick={() => handleLogout()} className="h-4 w-4" />,
      label: (
        <span onClick={() => handleLogout()} className="text-sm">
          Đăng xuất
        </span>
      ),
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (
      role === "staff" &&
      (item.key === "/manage-statistical" ||
        item.key === "/manage-emloyee" ||
        item.key === "/manage-customer")
    ) {
      return false;
    }
    return true;
  });

  const siderStyle = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "unset",
  };
  return (
    <Sider
      trigger={null}
      style={siderStyle}
      collapsible
      collapsed={collapsed}
      className={`!flex-none !bg-white ${
        !collapsed ? "!max-w-auto" : "!max-w-fit"
      } !min-w-14 transition-all duration-300`}
    >
      {collapsed ? (
        <div className="my-3">
          <Link to="/">
            <img
              src={favicon}
              className="m-auto mt-3"
              alt=""
              width={45}
              height={45}
            />
          </Link>
        </div>
      ) : (
        <div className="">
          <Link to="/">
            <img src={logo} className="m-auto w-full p-3" alt="" />
          </Link>
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
