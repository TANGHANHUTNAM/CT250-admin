import { useTranslation } from "react-i18next";

const Language = () => {
  const { i18n } = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const isRouteLogin = window.location.pathname === "/login";
  return (
    <div
      className={`${
        isRouteLogin ? "bg-[#224642] text-primary" : "bg-white text-black/70"
      } flex w-fit items-center justify-center  text-xl px-3  font-semibold`}
    >
      <div
        onClick={() => handleChangeLanguage("vi")}
        className="vi cursor-pointer"
      >
        <span className={`${i18n.language === "vi" ? "text-red-400" : ""}`}>
          VI
        </span>
      </div>
      <div className="mx-2 ">|</div>
      <div
        onClick={() => handleChangeLanguage("en")}
        className="en cursor-pointer"
      >
        <span className={`${i18n.language === "en" ? "text-blue-400" : ""}`}>
          EN
        </span>
      </div>
    </div>
  );
};

export default Language;
