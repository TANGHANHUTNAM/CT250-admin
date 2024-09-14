import { UserOutlined } from "@ant-design/icons";
import { Avatar as Avt } from "antd";
import { TiUpload } from "react-icons/ti";
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from "react";

const Avatar = ({ size = 32, src, ...props }) => {
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <div className="mx-auto relative">
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
      {props.isActive == "editing" &&
        <div rotationSlider className="absolute bottom-6 right-0 !bg-neutral-300 p-2 h-12 w-12 rounded-full text-center !text-black ">
          <ImgCrop rotationSlider>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              onChange={onChange}
              listType="none"
            >
              <TiUpload className="text-2xl" />
            </Upload>
          </ImgCrop>
        </div>}


    </div>
  );
};

export default Avatar;
