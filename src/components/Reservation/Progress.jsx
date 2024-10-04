import { useTranslation } from "react-i18next";

const Progress = ({ status = [], active, setActive = (key) => {} }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-sm w-full flex">
      {status.map((item, i) => {
        return (
          <button
            key={i}
            className={`p-3 text-center grow hover:text-violet-700 ${
              i === 0 ? "rounded-l-sm" : ""
            } ${i === status.length - 1 ? "rounded-r-sm" : ""} ${
              item.key === active
                ? "bg-violet-700 font-medium text-white hover:text-violet-50"
                : ""
            }`}
            onClick={() => setActive(item?.key)}
          >
            {t(item?.trans)}
          </button>
        );
      })}
    </div>
  );
};

export default Progress;
