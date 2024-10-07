import { Loading3QuartersOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LoadingLanguage = () => {
  return (
    <div className="flex items-center justify-center text-lg font-semibold px-3 text-tertiary">
      <Loading3QuartersOutlined className="animate-spin mr-2" />
      Loading...
    </div>
  );
};

const Language = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeLanguage = (language) => {
    setIsLoading(true);
    setTimeout(() => {
      i18n.changeLanguage(language);
      setIsLoading(false);
    }, 1500);
  };
  const isRouteLogin = window.location.pathname === "/login";
  return (
    <>
      {isLoading ? (
        <LoadingLanguage />
      ) : (
        <div
          className={`${
            isRouteLogin
              ? "bg-[#224642] text-primary"
              : "bg-white text-black/60"
          } flex w-fit items-center justify-center  text-lg px-2 font-semibold`}
        >
          <div
            onClick={() => handleChangeLanguage("vi")}
            className="vi cursor-pointer"
          >
            <span className={`${i18n.language === "vi" ? "text-red-500" : ""}`}>
              VI
            </span>
          </div>
          <div className="mx-1 text-black/60 text-base font-medium">|</div>
          <div
            onClick={() => handleChangeLanguage("en")}
            className="en cursor-pointer"
          >
            <span
              className={`${i18n.language === "en" ? "text-blue-500" : ""}`}
            >
              EN
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Language;
