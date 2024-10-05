import { Button, Dropdown, Layout, Tooltip, Menu } from "antd";
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
        <div className="flex gap-3 items-center text-black">
          <Avatar size={40} src={avatar} />
          <span className="flex flex-col gap-1 justify-start">
            <span className="font-semibold text-sm opacity-80">{username}</span>
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

  const notificationsMenu = (
    <div className="w-64 bg-white shadow-lg rounded-lg p-3">
      {/* Header */}
      <div className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-t-lg">
        You have 5 notifications
      </div>

      {/* Notifications List */}
      <ul className="py-2">
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">New user registered</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="w-5 h-5 text-red-500 mr-2"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">User deleted</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="w-5 h-5 text-blue-500 mr-2"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">Sales report is ready</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="w-5 h-5 text-purple-500 mr-2"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">New client</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="w-5 h-5 text-yellow-500 mr-2"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">Server overloaded</span>
        </li>
      </ul>

      {/* Divider */}
      <div className="border-t border-gray-200 my-2"></div>

      {/* Server Info */}
      <div className="px-4 py-2 text-sm font-semibold text-gray-600">
        Server
      </div>
      <ul className="py-2">
        <li className="px-4 py-2">
          <div className="text-xs font-semibold text-gray-600 mb-1 uppercase">
            CPU Usage
          </div>
          <div className="relative h-2 rounded-full bg-gray-200">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-500"
              style={{ width: "25%" }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">348 processes. 1/4 cores</div>
        </li>
        <li className="px-4 py-2">
          <div className="text-xs font-semibold text-gray-600 mb-1 uppercase">
            Memory Usage
          </div>
          <div className="relative h-2 rounded-full bg-gray-200">
            <div
              className="absolute top-0 left-0 h-2 bg-yellow-500"
              style={{ width: "70%" }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">11444GB/16384MB</div>
        </li>
        <li className="px-4 py-2">
          <div className="text-xs font-semibold text-gray-600 mb-1 uppercase">
            SSD Usage
          </div>
          <div className="relative h-2 rounded-full bg-gray-200">
            <div
              className="absolute top-0 left-0 h-2 bg-red-500"
              style={{ width: "90%" }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">243GB/256GB</div>
        </li>
      </ul>
    </div>
  );
  const orderTableMenu = (
    <div className="dropdown-menu show bg-white shadow-lg rounded-lg p-0">
      <h6 className="dropdown-header bg-gray-100 text-gray-600 font-semibold rounded-t-lg p-2">
        You have 5 pending tasks
      </h6>
      <ul className="divide-y divide-gray-200">
        <li className="py-2 px-4">
          <div className="flex justify-between text-sm">
            <span>Upgrade NPM</span>
            <span className="font-semibold">0%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </li>
        <li className="py-2 px-4">
          <div className="flex justify-between text-sm">
            <span>ReactJS Version</span>
            <span className="font-semibold">25%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: "25%" }}
            ></div>
          </div>
        </li>
        <li className="py-2 px-4">
          <div className="flex justify-between text-sm">
            <span>VueJS Version</span>
            <span className="font-semibold">50%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div>
        </li>
        <li className="py-2 px-4">
          <div className="flex justify-between text-sm">
            <span>Add new layouts</span>
            <span className="font-semibold">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
        </li>
        <li className="py-2 px-4">
          <div className="flex justify-between text-sm">
            <span>Angular Version</span>
            <span className="font-semibold">100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </li>
      </ul>
      <div className="py-2 text-center border-t border-gray-200">
        <a href="#" className="text-blue-600 font-semibold">
          View all tasks
        </a>
      </div>
    </div>
  );
  const contactMenu = (
    <div className="dropdown-menu show bg-white shadow-lg rounded-lg p-0">
      <h6 className="dropdown-header bg-gray-100 text-gray-600 font-semibold rounded-t-lg p-2">
        You have 4 messages
      </h6>
      <ul className="divide-y divide-gray-200">
        <li className="py-2 px-4 flex">
          <div className="avatar mr-3">
            <img
              src="https://coreui.io/demos/react/5.1/light/assets/1-Bxx5tbqp.jpg"
              alt="Jessica Williams"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>
            <div className="text-xs text-gray-500 flex justify-between">
              <span>Jessica Williams</span>
              <span>Just now</span>
            </div>
            <div className="font-semibold text-red-600">
              Urgent: System Maintenance Tonight
            </div>
            <div className="text-xs text-gray-500">
              Attention team, we'll be conducting critical system maintenance
              tonight from 10 PM to 2 AM. Plan accordingly...
            </div>
          </div>
        </li>
        <li className="py-2 px-4 flex">
          <div className="avatar mr-3">
            <img
              src="https://coreui.io/demos/react/5.1/light/assets/2-DU4eQes8.jpg"
              alt="Richard Johnson"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>
            <div className="text-xs text-gray-500 flex justify-between">
              <span>Richard Johnson</span>
              <span>5 minutes ago</span>
            </div>
            <div className="font-semibold text-red-600">
              Project Update: Milestone Achieved
            </div>
            <div className="text-xs text-gray-500">
              Kudos on hitting sales targets last quarter! Let's keep the
              momentum. New goals, new victories ahead...
            </div>
          </div>
        </li>
      </ul>
      <div className="py-2 text-center border-t border-gray-200">
        <a href="#" className="text-blue-600 font-semibold">
          View all messages
        </a>
      </div>
    </div>
  );

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
      <div className="flex items-center">
        {/* New Icons for Cart, Order Table, and Contact */}
        <Dropdown overlay={notificationsMenu} placement="bottomRight" arrow>
          <Link
            to={"/dishes-order"}
            type="text"
            className="relative text-2xl mr-4"
          >
            <TiShoppingCart className="opacity-75" />
            <div className="absolute bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -top-3 -right-3">
              1
            </div>
          </Link>
        </Dropdown>
        <Dropdown
          overlay={orderTableMenu}
          placement="bottomRight"
          arrow
          className="relative"
        >
          <Link
            to={"/table-order"}
            type="text"
            className="relative text-2xl mr-4"
          >
            <MdTableRestaurant className="opacity-75" />
            {/* Notification Badge */}
            <div className="absolute bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -top-3 -right-3">
              5
            </div>
          </Link>
        </Dropdown>

        <Dropdown overlay={contactMenu} placement="bottomRight" arrow>
          <Link
            to={"/manage-contact"}
            type="text"
            className="relative text-2xl mr-4"
          >
            <MdPermContactCalendar className="opacity-75" />
            <div className="absolute bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -top-3 -right-3">
              2
            </div>
          </Link>
        </Dropdown>

        <Language isAuth={isAuth} className="!self-center " />
        {/* Dropdown Avatar */}
        <div className="group ">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["hover"]}
          >
            <a className="flex pr-2.5" onClick={(e) => e.preventDefault()}>
              <Avatar size={40} src={avatar} className="self-center mx-2" />
              <span className="group-hover:text-black opacity-80 font-semibold text-black/80">
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
