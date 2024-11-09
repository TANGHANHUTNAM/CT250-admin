// src/components/ChangePasswordForm.js
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { toast } from "react-toastify";
import StatusCodes from "../../utils/StatusCodes";
import { useSelector } from "react-redux";
import { changePassword } from "../../services/accountService";

const ChangePasswordForm = () => {
  const [form] = Form.useForm();
  const { account } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { currentPassword, newPassword, confirmNewPassword } = values;

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu trùng khớp
    if (newPassword !== confirmNewPassword) {
      message.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    setLoading(true);

    try {
      // Gọi API để đổi mật khẩu
      const res = await changePassword(account.id, {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Đổi mật khẩu thành công!");
        form.resetFields();
      } else {
        toast.error(res.EM || "Đổi mật khẩu thất bại.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="!ml-8"
      initialValues={{
        // Bạn có thể thêm các giá trị mặc định nếu cần
      }}
    >
      <Form.Item
        name="currentPassword"
        label="Mật khẩu hiện tại"
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu hiện tại." },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="Mật khẩu mới"
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu mới." },
          { min: 6, message: "Mật khẩu mới phải có ít nhất 6 ký tự." },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirmNewPassword"
        label="Xác nhận mật khẩu mới"
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          { required: true, message: "Vui lòng xác nhận mật khẩu mới." },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Đổi mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
