import { UserOutlined } from "@ant-design/icons";
import { Avatar as Avt } from "antd";
import { TiUpload } from "react-icons/ti";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";

const Avatar = ({ size = 32, src, ...props }) => {
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <div className="flex items-center justify-center">
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
      {props.isActive == "editing" && (
        <div className="absolute bottom-6 right-0 h-12 w-12 rounded-full !bg-neutral-300 p-2 text-center !text-black">
          <ImgCrop rotationSlider>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              onChange={onChange}
              listType="none"
            >
              <TiUpload className="text-2xl" />
            </Upload>
          </ImgCrop>
        </div>
      )}
    </div>
  );
};

export default Avatar;
