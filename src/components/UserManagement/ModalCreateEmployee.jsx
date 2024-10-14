import { DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import StatusCodes from "../../utils/StatusCodes";
import { toast } from "react-toastify";
import { createUserRoleStaff } from "../../services/accountService";
const ModalCreateEmployee = ({
  isLoading,
  setIsLoading,
  fetchListUser,
  openModalCreateEmployee,
  setOpenModalCreateEmployee,
}) => {
  const [form] = Form.useForm();

  const onCreate = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        ...values,
        birthday: dayjs(values.birthday).format("YYYY-MM-DD"),
      };
      const res = await createUserRoleStaff(value);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Thêm nhân viên thành công!");
        fetchListUser();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error("Thêm nhân viên thất bại!");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Lỗi server!");
    }
    setOpenModalCreateEmployee(false);
    setIsLoading(false);
  };
  return (
    <>
      <Modal
        open={openModalCreateEmployee}
        title="Thêm nhân viên"
        okText="Thêm"
        cancelText="Hủy"
        style={{ top: 30 }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoading,
        }}
        cancelButtonProps={{ danger: true }}
        onCancel={() => setOpenModalCreateEmployee(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="email"
          label="Email:"
          rules={[
            {
              required: true,
              message: "Email không được để trống!",
            },
            {
              type: "email",
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fullname"
          label="Họ và tên:"
          rules={[
            {
              required: true,
              message: "Họ và tên không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại:"
          rules={[
            {
              required: true,
              message: "Số điện thoại không được để trống!",
            },
            {
              pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Giới tính:"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giới tính!",
            },
          ]}
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="birthday"
          label="Ngày sinh:"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày sinh!",
            },
          ]}
          style={{ width: "100%" }}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày sinh"
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ:"
          rules={[
            {
              required: true,
              message: "Địa chỉ không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEmployee;
