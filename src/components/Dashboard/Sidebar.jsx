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
      toast.success("Đăng xuất thành công!");
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
          {t("Sidebar.dashboard")}
        </Link>
      ),
    },

    {
      key: "/manage-statistical",
      icon: <IoMdStats className="h-4 w-4" />,
      label: (
        <Link to="/manage-statistical" className="text-sm">
          {t("Sidebar.statistical")}
        </Link>
      ),
    },
    {
      key: "/manage-user",
      icon: <FaUsersGear className="h-4 w-4" />,
      label: (
        <Link to="/manage-user" className="text-sm">
          Người dùng
        </Link>
      ),
    },
    {
      key: "/dishes-order",
      icon: <TiShoppingCart className="h-4 w-4" />,
      label: (
        <Link to="/dishes-order" className="text-sm">
          Đơn đặt hàng
        </Link>
      ),
    },
    {
      key: "Đơn bàn",
      icon: <MdTableRestaurant className="h-4 w-4" />,
      label: <div className="text-sm">Đơn bàn</div>,
      children: [
        {
          key: "/table-order",
          label: (
            <Link to="/table-order" className="text-sm">
              Đơn đặt bàn
            </Link>
          ),
        },
        {
          key: "/manage-table",
          label: (
            <Link to="/manage-table" className="text-sm">
              Quản lý bàn
            </Link>
          ),
        },
      ],
    },
    {
      key: "Món ăn",
      icon: <FaBowlFood className="h-4 w-4" />,
      label: <div className="text-sm">Món ăn</div>,
      children: [
        {
          key: "/manage-dishes",
          label: (
            <Link to="/manage-dishes" className="text-sm">
              Quản lý món ăn
            </Link>
          ),
        },
        {
          key: "/manage-category",
          label: (
            <Link to="/manage-category" className="text-sm">
              Quản lý danh mục
            </Link>
          ),
        },
      ],
    },
    {
      key: "news",
      icon: <IoNewspaper className="h-4 w-4" />,
      label: <div className="text-sm">{t("Sidebar.manageNews")}</div>,
      children: [
        {
          key: "/create-news",
          label: (
            <Link to="/create-news" className="text-sm">
              Tạo tin tức
            </Link>
          ),
        },
        {
          key: "/manage-news",
          label: (
            <Link to="/manage-news" className="text-sm">
              Quản lý tin tức
            </Link>
          ),
        },
      ],
    },
    {
      key: "/manage-discount",
      icon: <MdDiscount className="h-4 w-4" />,
      label: (
        <Link to="/manage-discount" className="text-sm">
          {t("Sidebar.manageDiscount")}
        </Link>
      ),
    },
    {
      key: "/manage-contact",
      icon: <MdPermContactCalendar className="h-4 w-4" />,
      label: (
        <Link to="/manage-contact" className="text-sm">
          {t("Sidebar.manageContact")}
        </Link>
      ),
    },
    {
      key: "/logout",
      icon: <TbLogout2 onClick={() => handleLogout()} className="h-4 w-4" />,
      label: (
        <span onClick={() => handleLogout()} className="text-sm">
          {t("Sidebar.logout")}
        </span>
      ),
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (
      role === "staff" &&
      (item.key === "/manage-statistical" ||
        item.key === "/manage-user" ||
        item.key === "/manage-customer" ||
        item.key === "news" ||
        item.key === "/manage-discount")
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
        mode="inline"
        className="font-medium"
        items={filteredMenuItems}
        defaultSelectedKeys={["/"]}
        selectedKeys={window.location.pathname}
      />
    </Sider>
  );
};

export default Sidebar;
