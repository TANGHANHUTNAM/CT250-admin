import { useTranslation } from "react-i18next";

const Progress = ({ status = [], active, setActive = (key) => {} }) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full rounded-sm bg-white">
      {status.map((item, i) => {
        return (
          <button
            key={i}
            className={`grow p-3 text-center hover:text-blue-600 ${
              i === 0 ? "rounded-l-sm" : ""
            } ${i === status.length - 1 ? "rounded-r-sm" : ""} ${
              item.key === active
                ? "bg-blue-600 font-medium text-white hover:!text-blue-50"
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
