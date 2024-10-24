import { Dropdown } from "antd";
import { MdPermContactCalendar } from "react-icons/md";
import { PiDeviceTabletSpeakerFill } from "react-icons/pi";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();

  const order = useSelector((state) => state.order);
  const notificationsMenu = (
    <div className="dropdown-menu show w-80 rounded-lg bg-white p-0 shadow-lg">
      <h6 className="dropdown-header rounded-t-lg bg-yellow-500 p-2 pl-4 font-semibold text-white">
        {t("Notifications.order.new", { total: order?.total })}
      </h6>
      <ul className="w-full divide-y divide-gray-200">
        {order?.data?.slice(0, 3)?.map((item) => {
          return (
            <li key={item?._id} className="flex w-full px-4 py-2">
              <div className="w-full">
                <div className="flex items-center justify-between text-sm font-medium text-gray-500">
                  <span className="truncate">{item?.receiverPhone}</span>
                  <span className="text-xs">
                    {new Date(item?.orderDate).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-500">
                  <div className="text-gray-500">{item?.receiverName}</div>
                  <div className="font-xs text-yellow-400">
                    x{item?.dishes?.length}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-gray-200 py-2 text-center">
        <Link
          to={"/dishes-order"}
          className="font-semibold text-yellow-500 hover:text-yellow-600"
        >
          {t("Notifications.order.seeAllOrder")}
        </Link>
      </div>
    </div>
  );

  const reservation = useSelector((state) => state.reservation);
  const orderTableMenu = (
    <div className="dropdown-menu show w-80 rounded-lg bg-white p-0 shadow-lg">
      <h6 className="dropdown-header rounded-t-lg bg-red-500 p-2 pl-4 font-semibold text-white">
        {t("Notifications.reservation.new", { total: reservation?.total })}
      </h6>
      <ul className="w-full divide-y divide-gray-200">
        {reservation?.data?.slice(0, 3)?.map((item) => {
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
          {t("Notifications.reservation.seeAllOrder")}
        </Link>
      </div>
    </div>
  );

  const { totalContactPending, contactPending } = useSelector(
    (state) => state.contact,
  );

  const contactMenu = (
    <div className="dropdown-menu show min-w-80 rounded-lg bg-white p-0 shadow-lg">
      <h6 className="dropdown-header rounded-t-lg bg-blue-500 p-2 pl-4 font-semibold text-white">
        {t("Notifications.contacts.new", { totalContactPending })}
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
          {t("Notifications.contacts.seeAllContact")}
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
            {order?.total ?? 0}
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
