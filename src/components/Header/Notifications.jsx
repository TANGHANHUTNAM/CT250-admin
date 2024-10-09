import { Dropdown } from "antd";
import { useEffect } from "react";
import { MdPermContactCalendar } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchContactPending } from "../../redux/reducer/contactSlice";
import { PiDeviceTabletSpeakerFill } from "react-icons/pi";

const Notifications = () => {
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

  const reservation = useSelector((state) => state.reservation);
  const orderTableMenu = (
    <div className="dropdown-menu show bg-white shadow-lg rounded-lg p-0 w-80">
      <h6 className="dropdown-header bg-red-500 text-white font-semibold rounded-t-lg p-2 pl-4">
        Bạn có {reservation?.total} đơn đặt bàn mới
      </h6>
      <ul className="divide-y divide-gray-200 w-full">
        {reservation?.data?.map((item) => {
          return (
            <li key={item?._id} className="py-2 px-4 flex w-full">
              <div className="w-full">
                <div className="text-sm font-medium text-gray-500 flex justify-between items-center">
                  <span className="truncate">{item?.customerPhone}</span>
                  <span className="text-xs">
                    {new Date(item?.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
                <div className="text-gray-500">{item?.customerName}</div>
                <div className="font-xs text-red-400">
                  {item?.customerEmail}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="py-2 text-center border-t border-gray-200">
        <Link
          to={"/table-order"}
          className="text-red-500 font-semibold hover:text-red-600"
        >
          Xem tất cả đơn
        </Link>
      </div>
    </div>
  );

  // const dipatch = useDispatch();
  // useEffect(() => {
  //   dipatch(
  //     fetchContactPending({
  //       page: 1,
  //       limit: 5,
  //     })
  //   );
  // }, [dipatch]);
  const { totalContactPending, contactPending } = useSelector(
    (state) => state.contact
  );

  const contactMenu = (
    <div className="dropdown-menu show bg-white shadow-lg rounded-lg p-0">
      <h6 className="dropdown-header bg-blue-500 text-white font-semibold rounded-t-lg p-2 pl-4">
        Bạn có {totalContactPending} liên hệ mới
      </h6>
      <ul className="divide-y divide-gray-200">
        {contactPending.map((contact) => {
          return (
            <li key={contact._id} className="py-2 px-4 flex">
              <div>
                <div className="text-sm font-medium text-gray-500 flex justify-between">
                  <span>{contact.customerName}</span>
                  <span className="text-xs">
                    {new Date(contact?.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
                <div className="font-xs text-blue-400">
                  {contact.customerEmail}
                </div>
                <div className="text-xs font-medium text-gray-500 w-80 overflow-hidden truncate">
                  {contact.content}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="py-2 text-center border-t border-gray-200">
        <Link to={"/manage-contact"} className="text-blue-600 font-semibold">
          Xem tất cả liên hệ
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <Dropdown overlay={notificationsMenu} placement="bottomRight" arrow>
        <Link
          to={"/dishes-order"}
          type="text"
          className="relative text-2xl mr-4"
        >
          <TiShoppingCart className="opacity-75" />
          <div className="absolute bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -top-3 -right-3">
            0
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
          <PiDeviceTabletSpeakerFill className="opacity-75" />
          {/* Notification Badge */}
          <div className="absolute bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -top-3 -right-3">
            {reservation?.total}
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
            {totalContactPending}
          </div>
        </Link>
      </Dropdown>
    </>
  );
};

export default Notifications;
