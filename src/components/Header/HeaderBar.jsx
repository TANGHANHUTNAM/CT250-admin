import { Button, Dropdown, Layout } from "antd";
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
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
import { IoMdArrowDropdown } from "react-icons/io";

const HeaderBar = ({ collapsed, setCollapsed }) => {
  const {
    isAuth,
    account: { avatar, username, role, id, email },
  } = useSelector((state) => state.user);
  // Handle Logout

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
        <div className="flex gap-3 items-center text-black">
          <Avatar size={40} src={avatar} />
          <span className="flex flex-col gap-1 justify-start">
            <span className="font-semibold text-md opacity-80">{username}</span>
            <span className="text-sm font-medium opacity-40 uppercase">
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
          Trang cá nhân
        </Link>
      ),
      icon: <FaUser className="custom-menu-item custom-menu-item-icon" />,
    },
    {
      key: "3",
      label: (
        <Link to="/settings" className="custom-menu-item">
          Cài đặt
        </Link>
      ),
      icon: <IoMdSettings className="custom-menu-item custom-menu-item-icon" />,
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleLogout()} className="custom-menu-item">
          Đăng xuất
        </span>
      ),
      icon: <TbLogout2 className="custom-menu-item custom-menu-item-icon" />,
    },
  ];
  return (
    <Header className="flex justify-between bg-white mx-5 p-0">
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
      <div className="flex">
        <Language isAuth={isAuth} className="!self-center " />
        {/* Dropdown Avatar */}
        <div className=" hover:!bg-gray-300 self-center">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["hover"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <div className="flex px-2 items-center justify-center">
                <Avatar size={40} src={avatar} className="self-center" />
                <span className="ml-2 font-semibold text-black/60 group-hover:text-black/80">
                  {username}
                </span>
              </div>
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderBar;
