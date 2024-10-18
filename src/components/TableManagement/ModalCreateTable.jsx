import { Form, Modal, Select } from "antd";

const ModalCreateTable = ({
  isLoading,
  listTypeTable,
  handleCreateTable,
  openModalCreateTable,
  setOpenModalCreateTable,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values) => {
    handleCreateTable(values);
  };
  return (
    <>
      <Modal
        open={openModalCreateTable}
        maskClosable={false}
        title="Thêm bàn mới"
        okText="Thêm"
        cancelText="Hủy"
        cancelButtonProps={{ danger: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoading,
        }}
        onCancel={() => setOpenModalCreateTable(false)}
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
          name="tableTypeId"
          label="Loại bàn"
          rules={[
            {
              required: true,
              message: "Loại bàn không được để trống!",
            },
          ]}
        >
          <Select>
            {listTypeTable?.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {`${item.name}  (${item.capacity} người)`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateTable;
