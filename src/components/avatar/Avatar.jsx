import { UserOutlined } from "@ant-design/icons";
import { Avatar as Avt } from "antd";

const Avatar = ({ size = 32, src, ...props }) => {
  return (
    <Avt
      size={size}
      style={{
        backgroundColor: "#ffe5d1d4",
        color: "#ff882c",
        cursor: "pointer",
      }}
      icon={<UserOutlined />}
      src={src || undefined}
      {...props}
    />
  );
};

export default Avatar;
