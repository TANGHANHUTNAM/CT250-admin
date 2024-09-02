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
    <div className="fixed right-0 top-1/4 z-50">
      <div className="group relative flex h-[40px] w-[40px] items-center justify-center !rounded-md bg-tertiary">
        <span>
          <GrLanguage className="cursor-pointer text-2xl text-primary" />
        </span>
        <div className="dropdown-menu absolute right-0 top-6 block scale-90 pt-4 opacity-0 transition-all duration-300 will-change-transform group-hover:opacity-100 sm:invisible sm:block sm:group-hover:visible sm:group-hover:scale-100">
          <div className="flex w-24 cursor-pointer flex-col gap-2 bg-primary p-2">
            {/* Vietnamese */}

            <div
              onClick={() => {
                handleChangeLanguage("vi");
              }}
              className={`flex gap-1 text-xs ${
                i18n.language == "vi" ? "font-medium text-red-600" : ""
              } `}
            >
              <img src={vietnam} className="h-3 w-4" alt="" />
              <span>Việt Nam</span>
            </div>
            {/* English */}
            <div
              onClick={() => {
                handleChangeLanguage("en");
              }}
              className={`flex gap-1 text-xs ${
                i18n.language == "en" ? "font-medium text-blue-600" : ""
              } `}
            >
              <img src={english} className="h-4 w-4" alt="" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Language;
