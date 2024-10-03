import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import Avatar from "../avatar/Avatar";
import { FaCog, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { useDynamicTitle } from "../../hooks";

const UserInfo = () => {
  useDynamicTitle("Trang cá nhân");
  const { account } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState("userinfo");
  const [formData, setFormData] = useState({
    username: "Ben Sherman",
    email: "ben.sherman@gmail.com",
    gender: "Male",
    birthday: new Date("1999-07-30"),
    language: "English",
    country: "United States",
    emailNotification: true,
    privateAccount: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthday: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsActive("userinfo"); // Switch back to "userinfo" tab after saving
  };

  return (
    <div className="flex flex-row bg-white !h-screen !overflow-hidden p-3">
      <div className="basis-1/4 flex flex-col justify-start border-r-2 border-gray-200 pt-24">
        <Avatar
          size={150}
          src={account.avatar}
          className="!mx-auto mb-12"
          isActive={isActive}
        />
        <div className="mx-auto flex flex-col !items-center text-neutral-400 !w-full ">
          <Tooltip placement="right" title={t("UserInfo.usertab")}>
            <li
              className={`${
                isActive === "userinfo"
                  ? "!font-semibold !text-black border-r-4 border-black"
                  : ""
              }  text-lg font-medium transition duration-200 flex justify-center cursor-pointer px-5 !w-full`}
              onClick={() => setIsActive("userinfo")}
            >
              <div className="flex justify-start items-center !w-36">
                <FaUserCircle className={`text-2xl !my-3 mr-2`} />
                {t("UserInfo.usertab")}
              </div>
            </li>
          </Tooltip>
          <Tooltip placement="right" title={t("UserInfo.edittab")}>
            <li
              className={`${
                isActive === "editing"
                  ? "!font-semibold !text-black border-r-4 border-black"
                  : ""
              }  text-lg font-medium transition duration-200 flex items-center justify-center cursor-pointer px-5 !w-full text-left`}
              onClick={() => setIsActive("editing")}
            >
              <div className="flex !justify-start items-center !w-36">
                <FaCog className={`text-2xl !my-3 mr-2`} />
                {t("UserInfo.edittab")}
              </div>
            </li>
          </Tooltip>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-8 basis-3/4">
        <h1 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200">
          {t("UserInfo.title")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-md font-medium text-gray-700">
              {t("UserInfo.username")}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={isActive === "userinfo"} // Disable when in "userinfo"
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              {t("UserInfo.currentpassword")}
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              disabled={isActive === "userinfo"}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              {t("UserInfo.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isActive === "userinfo"}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              {t("UserInfo.newpassword")}
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              disabled={isActive === "userinfo"}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              {t("UserInfo.gender")}
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={isActive === "userinfo"}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {t("UserInfo.genderselection", { returnObjects: true }).map(
                (gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              {t("UserInfo.confirmpassword")}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={isActive === "userinfo"}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              {t("UserInfo.language")}
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              disabled={isActive === "userinfo"}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              {t("UserInfo.country")}
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              disabled={isActive === "userinfo"}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          <div className="">
            <label className="block text-md font-medium text-gray-700">
              {t("UserInfo.birthday")}
            </label>
            <DatePicker
              selected={formData.birthday}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              disabled={isActive === "userinfo"}
              className="mt-1 block w-full rounded-sm border-2 border-gray-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {isActive === "editing" && (
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-violet-700 text-white rounded-sm border-2 border-gray-200 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {t("UserInfo.save")}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
