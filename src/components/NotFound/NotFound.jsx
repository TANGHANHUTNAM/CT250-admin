import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useDynamicTitle } from "../../hooks";

const NotFound = () => {
  useDynamicTitle("404 Not Found");
  const navigate = useNavigate();
  const handleBackPage = () => {
    navigate(-1);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Rất tiếc, trang bạn đã truy cập không tồn tại."
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

export default NotFound;
