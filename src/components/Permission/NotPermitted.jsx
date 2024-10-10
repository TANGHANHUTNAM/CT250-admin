import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useDynamicTitle } from "../../hooks";
import { useTranslation } from "react-i18next";

const NotPermitted = () => {
  useDynamicTitle("403 Not Permitted");
  const navigate = useNavigate();
  const handleBackPage = () => {
    navigate(-1);
  };
  const { t } = useTranslation();
  return (
    <div className="p-3">
      <Result
        status="403"
        title="403"
        subTitle={t("NotPermitted.subTitle")}
        extra={
          <span
            onClick={() => handleBackPage()}
            className="px-3 py-2 bg-blue-500 rounded-md w-fit cursor-pointer hover:text-white"
            type="primary"
          >
            Trở lại
          </span>
        }
      />
    </div>
  );
};

export default NotPermitted;
