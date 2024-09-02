import { GrLanguage } from "react-icons/gr";
import vietnam from "../../assets/vietname.png";
import english from "../../assets/english.png";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="fixed right-0 top-1/4">
      <div className="group relative bg-tertiary w-[40px] h-[40px] flex items-center justify-center rounded-sm">
        <span>
          <GrLanguage className="text-2xl text-primary cursor-pointer" />
        </span>
        <div className="block sm:block absolute dropdown-menu right-0 top-6 pt-4 transition-all duration-300 will-change-transform scale-90 opacity-0 sm:invisible sm:group-hover:visible sm:group-hover:scale-100 group-hover:opacity-100">
          <div className="flex flex-col gap-2 w-24 p-2 bg-primary cursor-pointer">
            {/* Vietnamese */}
            <div
              onClick={() => handleChangeLanguage("vi")}
              className={`text-xs flex gap-1 ${
                i18n.language === "vi" ? "text-red-600 font-medium" : ""
              } `}
            >
              <img src={vietnam} className="w-4 h-3" alt="Vietnamese flag" />
              <span>Việt Nam</span>
            </div>
            {/* English */}
            <div
              onClick={() => handleChangeLanguage("en")}
              className={`text-xs flex gap-1 ${
                i18n.language === "en" ? "text-blue-600 font-medium" : ""
              } `}
            >
              <img src={english} className="w-4 h-4" alt="English flag" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;