import { UserOutlined } from "@ant-design/icons";
import { Avatar as Avt } from "antd";

const Avatar = ({ size = 32, src, ...props }) => {
  return (
    <div className="flex items-center relative">
      <Avt
        size={size}
        style={{
          backgroundColor: "#cccccc",
          color: "#fff",
        }}
        icon={<UserOutlined />}
        src={src || undefined}
        {...props}
      />
    </div>
  );
};

export default Avatar;
