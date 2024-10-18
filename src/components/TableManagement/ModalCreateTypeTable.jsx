import { Form, Input, Modal } from "antd";

const ModalCreateTypeTable = ({
  isLoading,
  handleCreateTypeTable,
  openModalCreateTypeTable,
  setOpenModalCreateTypeTable,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values) => {
    handleCreateTypeTable(values);
  };
  return (
    <>
      <Modal
        open={openModalCreateTypeTable}
        maskClosable={false}
        title="Thêm loại bàn mới"
        okText="Thêm"
        cancelText="Hủy"
        cancelButtonProps={{ danger: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoading,
        }}
        onCancel={() => setOpenModalCreateTypeTable(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            disabled={isLoading}
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
          name="name"
          label="Tên loại bàn"
          rules={[
            {
              required: true,
              message: "Tên loại bàn không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="capacity"
          label="Sức chứa"
          rules={[
            {
              required: true,
              message: "Sức chứa không được để trống!",
            },
            {
              pattern: /^[0-9]*$/,
              message: "Sức chứa phải là số",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateTypeTable;
