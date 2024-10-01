import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useDynamicTitle } from "../../hooks";

const NotPermitted = () => {
  useDynamicTitle("403 Not Permitted");
  const navigate = useNavigate();
  const handleBackPage = () => {
    navigate(-1);
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không được phép truy cập trang này."
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
  );
};

export default NotPermitted;
