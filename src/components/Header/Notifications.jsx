import { Dropdown } from "antd";
import { MdPermContactCalendar } from "react-icons/md";
import { PiDeviceTabletSpeakerFill } from "react-icons/pi";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Notifications = () => {
  const notificationsMenu = (
    <div className="w-64 rounded-lg bg-white p-3 shadow-lg">
      {/* Header */}
      <div className="rounded-t-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
        You have 5 notifications
      </div>

      {/* Notifications List */}
      <ul className="py-2">
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="mr-2 h-5 w-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">New user registered</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="mr-2 h-5 w-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">User deleted</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="mr-2 h-5 w-5 text-blue-500"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">Sales report is ready</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="mr-2 h-5 w-5 text-purple-500"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">New client</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100">
          <svg
            className="mr-2 h-5 w-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/* SVG path */}
          </svg>
          <span className="text-gray-700">Server overloaded</span>
        </li>
      </ul>

      {/* Divider */}
      <div className="my-2 border-t border-gray-200"></div>

      {/* Server Info */}
      <div className="px-4 py-2 text-sm font-semibold text-gray-600">
        Server
      </div>
      <ul className="py-2">
        <li className="px-4 py-2">
          <div className="mb-1 text-xs font-semibold uppercase text-gray-600">
            CPU Usage
          </div>
          <div className="relative h-2 rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-2 bg-blue-500"
              style={{ width: "25%" }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">348 processes. 1/4 cores</div>
        </li>
        <li className="px-4 py-2">
          <div className="mb-1 text-xs font-semibold uppercase text-gray-600">
            Memory Usage
          </div>
          <div className="relative h-2 rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-2 bg-yellow-500"
              style={{ width: "70%" }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">11444GB/16384MB</div>
        </li>
        <li className="px-4 py-2">
          <div className="mb-1 text-xs font-semibold uppercase text-gray-600">
            SSD Usage
          </div>
          <div className="relative h-2 rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-2 bg-red-500"
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
    <div className="dropdown-menu show w-80 rounded-lg bg-white p-0 shadow-lg">
      <h6 className="dropdown-header rounded-t-lg bg-red-500 p-2 pl-4 font-semibold text-white">
        Bạn có {reservation?.total} đơn đặt bàn mới
      </h6>
      <ul className="w-full divide-y divide-gray-200">
        {reservation?.data?.map((item) => {
          return (
            <li key={item?._id} className="flex w-full px-4 py-2">
              <div className="w-full">
                <div className="flex items-center justify-between text-sm font-medium text-gray-500">
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
      <div className="border-t border-gray-200 py-2 text-center">
        <Link
          to={"/table-order"}
          className="font-semibold text-red-500 hover:text-red-600"
        >
          Xem tất cả đơn
        </Link>
      </div>
    </div>
  );

  const { totalContactPending, contactPending } = useSelector(
    (state) => state.contact,
  );

  const contactMenu = (
    <div className="dropdown-menu show rounded-lg bg-white p-0 shadow-lg">
      <h6 className="dropdown-header rounded-t-lg bg-blue-500 p-2 pl-4 font-semibold text-white">
        Bạn có {totalContactPending} liên hệ mới
      </h6>
      <ul className="divide-y divide-gray-200">
        {contactPending.slice(0, 3).map((contact) => {
          return (
            <li key={contact._id} className="flex px-4 py-2">
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-500">
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
                <div className="w-80 overflow-hidden truncate text-xs font-medium text-gray-500">
                  {contact.content}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-gray-200 py-2 text-center">
        <Link to={"/manage-contact"} className="font-semibold text-blue-600">
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
          className="relative mr-4 text-2xl"
        >
          <TiShoppingCart className="opacity-75" />
          <div className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs text-white">
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
          className="relative mr-4 text-2xl"
        >
          <PiDeviceTabletSpeakerFill className="opacity-75" />
          {/* Notification Badge */}
          <div className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {reservation?.total}
          </div>
        </Link>
      </Dropdown>
      <Dropdown overlay={contactMenu} placement="bottomRight" arrow>
        <Link
          to={"/manage-contact"}
          type="text"
          className="relative mr-4 text-2xl"
        >
          <MdPermContactCalendar className="opacity-75" />
          <div className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
            {totalContactPending}
          </div>
        </Link>
      </Dropdown>
    </>
  );
};

export default Notifications;
