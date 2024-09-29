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
        isRouteLogin ? "bg-[#224642] text-primary" : "bg-white text-black/60"
      } flex w-fit items-center justify-center  text-xl px-3  font-semibold`}
    >
      <div
        onClick={() => handleChangeLanguage("vi")}
        className="vi cursor-pointer"
      >
        <span className={`${i18n.language === "vi" ? "text-tertiary" : ""}`}>
          VI
        </span>
      </div>
      <div className="mx-1.5 text-tertiary">|</div>
      <div
        onClick={() => handleChangeLanguage("en")}
        className="en cursor-pointer"
      >
        <span className={`${i18n.language === "en" ? "text-tertiary" : ""}`}>
          EN
        </span>
      </div>
    </div>
  );
};

export default Language;
