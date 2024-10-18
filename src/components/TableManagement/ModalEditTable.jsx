import { Form, Modal, Select } from "antd";
import { useState } from "react";

const ModalEditTable = ({
  isLoading,
  detailTable,
  setDetailTable,
  listTypeTable,
  openModalEditTable,
  setOpenModalEditTable,
  handleUpdateTable,
}) => {
  const [form] = Form.useForm();
  const [isSelect, setIsSelect] = useState(false);

  const handleEditTable = (value) => {
    handleUpdateTable(detailTable._id, value);
  };
  return (
    <>
      <Modal
        title={`Chỉnh sửa bàn ${detailTable?.tableNumber} - loại bàn ${detailTable?.type}`}
        afterClose={() => {
          setDetailTable(null);
          setIsSelect(false);
          form.resetFields();
        }}
        open={openModalEditTable}
        cancelText="Hủy"
        cancelButtonProps={{ danger: true }}
        okText="Lưu"
        okButtonProps={{
          disabled: !isSelect,
          loading: isLoading,
          key: "submit",
          htmlType: "submit",
          form: "edit_table",
        }}
        onOk={() => setOpenModalEditTable(false)}
        onCancel={() => setOpenModalEditTable(false)}
        maskClosable={false}
      >
        <Form
          disabled={isLoading}
          name="edit_table"
          onFinish={handleEditTable}
          form={form}
        >
          <Form.Item name="tableTypeId" label="Loại bàn">
            <Select
              onChange={() => {
                setIsSelect(true);
              }}
            >
              {listTypeTable?.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {`${item.name}  (${item.capacity} người)`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditTable;
