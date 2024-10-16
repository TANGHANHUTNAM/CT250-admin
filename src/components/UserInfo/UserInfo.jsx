import { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  DatePicker,
  message,
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

const UserInfo = () => {
  const { Option } = Select;
  const { account } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(""); // State for upload status
  const dispatch = useDispatch();

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      // If more than one file is selected, display an error message
      message.error("You can only upload one file.");
      return;
    }
    setFileList(newFileList);
    // Update upload status
    if (newFileList.length > 0) {
      setUploadStatus(`Selected ${newFileList.length} file`);
    } else {
      setUploadStatus("");
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    // Append form data fields
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

    // Append uploaded image (if any)
    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    } else {
      formData.append("avatar", values.avatar);
    }

    console.log(formData);

    try {
      // Call the API to update user information
      const res = await updateUserInfomation(
        account.id,
        formData,
        values.avatar,
      );
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success(res.EM);
        dispatch(updateInformation({ ...res.DT, avatar: res.DT?.avatar?.url }));
        setFileList([]); // Clear the uploaded file
        setUploadStatus(""); // Clear the upload status after success
      }
      if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to update profile.");
    }
  };

  const labelWithRequired = (label) => <span>{label}</span>;

  const props = {
    onRemove: (file) => {
      setFileList([]); // Clear fileList when file is removed
      setUploadStatus(""); // Clear upload status
    },
    beforeUpload: (file) => {
      if (fileList.length >= 1) {
        // If already has one file, show error message
        message.error("You can only upload one file.");
        return Upload.LIST_IGNORE; // Prevent adding the file
      }
      setFileList([file]); // Only allow one file
      setUploadStatus(`Selected 1 file`); // Update upload status
      return false; // Prevent auto upload
    },
    fileList,
    showUploadList: false, // Hide default upload list
  };

  // Function to handle file removal
  const handleRemoveFile = () => {
    setFileList([]); // Clear the fileList
    setUploadStatus(""); // Clear the upload status
    message.success("File removed successfully."); // Show success message
  };

  return (
    <div className="flex-row bg-white p-6">
      <div className="mb-12 mt-4 flex w-full flex-row items-center">
        <div className="relative ml-6 !h-fit !basis-3/12 !justify-start">
          <Avatar size={180} src={account.avatar} />
          {/* Display upload status below the upload button */}
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
              Remove File
            </Button>
            {uploadStatus && (
              <div className="ml-4 text-sm text-gray-600">{uploadStatus}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-5 ml-8 text-2xl">Account</div>

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
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label={labelWithRequired("Email")}
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fullName"
              label={labelWithRequired("Full name")}
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="birthday" label="Birthday">
              <DatePicker format={"DD/MM/YYYY"} className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="gender" label="Gender">
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="role" label="Role">
              <Select disabled>
                <Option value="customer">Customer</Option>
                <Option value="staff">Staff</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UserInfo;
