// src/components/UserInfo.js
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  DatePicker,
  message,
  Tabs,
} from "antd";
import Avatar from "../avatar/Avatar";
import { IoCameraOutline } from "react-icons/io5";
import { Upload } from "antd";
import StatusCodes from "../../utils/StatusCodes";
import { toast } from "react-toastify";
import ImgCrop from "antd-img-crop";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfomation } from "../../services/accountService";
import dayjs from "dayjs";
import { updateInformation } from "../../redux/reducer/userSlice";
import ChangePasswordForm from "./ChangePasswordForm"; // Import form đổi mật khẩu

const UserInfo = () => {
  const { Option } = Select;
  const { account } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(""); // State for upload status
  const dispatch = useDispatch();

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      // Nếu chọn nhiều hơn một file, hiển thị thông báo lỗi
      message.error("Bạn chỉ được tải lên 1 file.");
      return;
    }
    setFileList(newFileList);
    // Cập nhật trạng thái upload
    if (newFileList.length > 0) {
      setUploadStatus(`Chọn ${newFileList.length} file`);
    } else {
      setUploadStatus("");
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    // Append các trường dữ liệu
    formData.append("username", values.username);
    formData.append("fullname", values.fullName);
    formData.append(
      "birthday",
      values.birthday
        ? dayjs(values.birthday, "DD/MM/YYYY").format("YYYY-MM-DD")
        : "",
    );
    formData.append("gender", values.gender);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("address", values.address);

    // Append ảnh tải lên (nếu có)
    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    } else {
      formData.append("avatar", values.avatar);
    }

    console.log(formData);

    try {
      // Gọi API để cập nhật thông tin người dùng
      const res = await updateUserInfomation(
        account.id,
        formData,
        values.avatar,
      );
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Cập nhật thông tin thành công!");
        dispatch(updateInformation({ ...res.DT, avatar: res.DT?.avatar?.url }));
        setFileList([]); // Xóa file đã tải lên
        setUploadStatus(""); // Xóa trạng thái upload sau khi thành công
      }
      if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Lỗi đăng ảnh.");
    }
  };

  const labelWithRequired = (label) => <span>{label}</span>;

  const props = {
    onRemove: (file) => {
      setFileList([]); // Xóa file khi remove
      setUploadStatus(""); // Xóa trạng thái upload
    },
    beforeUpload: (file) => {
      if (fileList.length >= 1) {
        // Nếu đã có một file, hiển thị thông báo lỗi
        message.error("Bạn chỉ được tải lên 1 file.");
        return Upload.LIST_IGNORE; // Ngăn không thêm file
      }
      setFileList([file]); // Chỉ cho phép một file
      setUploadStatus(`Chọn 1 ảnh`); // Cập nhật trạng thái upload
      return false; // Ngăn không tự động upload
    },
    fileList,
    showUploadList: false, // Ẩn danh sách upload mặc định
  };

  // Hàm xử lý xóa file
  const handleRemoveFile = () => {
    setFileList([]); // Xóa fileList
    setUploadStatus(""); // Xóa trạng thái upload
    message.success("Xóa ảnh thành công!"); // Hiển thị thông báo thành công
  };

  return (
    <div className="flex-row bg-white p-6">
      <div className="mb-12 mt-4 flex w-full flex-row items-center">
        <div className="relative ml-6 !h-fit !basis-3/12 !justify-start">
          <Avatar size={180} src={account.avatar} />
          {/* Hiển thị trạng thái upload dưới nút upload */}
          <ImgCrop rotationSlider>
            <Upload
              className="absolute bottom-0 right-32 z-50 flex h-12 w-12 items-center justify-center rounded-full !bg-neutral-300 !text-black"
              action={null}
              onChange={onChange}
              {...props}
            >
              {<IoCameraOutline className="text-2xl" />}
            </Upload>
          </ImgCrop>
        </div>
        <div className="!basis-8/12">
          <div className="text-2xl font-semibold">{account.fullname}</div>
          <div className="mb-3 mt-2 flex !text-lg">
            <div className="mr-1 font-medium text-blue-400">
              {account.email}
            </div>
            <div>-</div>
            <div className="ml-1 capitalize">{account.role}</div>
          </div>
          <div className="flex items-center">
            <Button type="default" onClick={handleRemoveFile}>
              Xóa ảnh
            </Button>
            {uploadStatus && (
              <div className="ml-4 text-sm text-gray-600">{uploadStatus}</div>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultActiveKey="1" className="w-full">
        <Tabs.TabPane tab="Tài khoản" key="1">
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={{
              username: account.username,
              email: account.email,
              fullName: account.fullname,
              role: account.role,
              gender: account.gender,
              birthday: dayjs(account.birthday, "DD/MM/YYYY"),
              phoneNumber: account.phoneNumber,
              address: account.address,
              avatar: account.avatar.url,
            }}
            layout="vertical"
            className="!ml-8"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label={labelWithRequired("Username")}
                  rules={[{ required: true, message: "Nhập vào username" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label={labelWithRequired("Email")}
                  rules={[
                    { required: true, message: "Nhập vào email" },
                    { type: "email", message: "Nhập email hợp lệ" },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="fullName"
                  label={labelWithRequired("Họ tên")}
                  rules={[{ required: true, message: "Nhập họ tên" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="birthday" label="Ngày sinh">
                  <DatePicker format={"DD/MM/YYYY"} className="w-full" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="gender" label="Giới tính">
                  <Select>
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                    <Option value="other">Khác</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phoneNumber" label="Số điện thoại">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="address" label="Địa chỉ">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="role" label="Vai trò">
                  <Select disabled>
                    <Option value="customer">Khách hàng</Option>
                    <Option value="staff">Nhân viên</Option>
                    <Option value="admin">Quản trị viên</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Đổi mật khẩu" key="2">
          <ChangePasswordForm />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default UserInfo;
