import { Button, Dropdown, Layout, Tooltip } from "antd";
import { MdTableRestaurant } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";
import Avatar from "../avatar/Avatar";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderBar.css";
import { logout } from "../../services/authService";
import StatusCodes from "../../utils/StatusCodes";
import { toast } from "react-toastify";
import { logoutSuccess } from "../../redux/reducer/userSlice";
import Notifications from "./Notifications";

const HeaderBar = ({ collapsed, setCollapsed }) => {
  const { t } = useTranslation();

  const {
    isAuth,
    account: { avatar, username, role, id, email },
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

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-3 text-black">
          <Avatar size={40} src={avatar} />
          <span className="flex flex-col justify-start gap-1">
            <span className="text-sm font-semibold opacity-80">{username}</span>
            <span className="text-sm font-medium uppercase opacity-40">
              {role}
            </span>
          </span>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <Link className="custom-menu-item" to="/profile">
          {t("HeaderBarDropdown.personalPage")}
        </Link>
      ),
      icon: <FaUser className="custom-menu-item custom-menu-item-icon" />,
    },
    {
      key: "3",
      label: (
        <Link to="/settings" className="custom-menu-item">
          {t("HeaderBarDropdown.setting")}
        </Link>
      ),
      icon: <IoMdSettings className="custom-menu-item custom-menu-item-icon" />,
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleLogout()} className="custom-menu-item">
          {t("HeaderBarDropdown.signout")}
        </span>
      ),
      icon: <TbLogout2 className="custom-menu-item custom-menu-item-icon" />,
    },
  ];
  return (
    <Header className="sticky mx-5 flex justify-between bg-white p-0">
      <div className="flex">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <div className="flex items-center">
        {/* New Icons for Cart, Order Table, and Contact */}
        <Notifications />
        <Language isAuth={isAuth} className="!self-center" />
        {/* Dropdown Avatar */}
        <div className="group">
          <Dropdown
            menu={{
              items,
            }}
            className="w-fit"
            trigger={["hover"]}
          >
<<<<<<< HEAD
            <a className="flex pr-2.5" onClick={(e) => e.preventDefault()}>
=======
            <a className="flex pr-2" onClick={(e) => e.preventDefault()}>
>>>>>>> 148d236f0dc42199426b76bc953469509e7c8318
              <Avatar size={40} src={avatar} className="mx-2 self-center" />
              <span className="font-semibold text-black/80 opacity-80 group-hover:text-black">
                {username}
              </span>
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderBar;
