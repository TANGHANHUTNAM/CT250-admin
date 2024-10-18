import { Button, Form, Input, Modal, Table, Tooltip } from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

const ModalViewTypeTable = ({
  isLoading,
  handleUpdateTypeTable,
  listTypeTable,
  openModalViewTypeTable,
  setOpenModalViewTypeTable,
}) => {
  const LIMIT = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIMIT);

  const [form] = Form.useForm();
  const [detailTypeTable, setDetailTypeTable] = useState({});

  const columns = [
    {
      title: "STT",
      key: "STT",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Tên loại bàn",
      dataIndex: "name",
      align: "center",
      render: (name) => <span className="font-medium">{name}</span>,
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      align: "center",
      render: (createdAt) => (
        <span>{new Date(createdAt).toLocaleDateString("vi-VN")}</span>
      ),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      align: "center",
      render: (updatedAt) => (
        <span>{new Date(updatedAt).toLocaleDateString("vi-VN")}</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => {
        return (
          <Tooltip title="Chỉnh sửa loại bàn">
            <button
              onClick={() => {
                form.setFieldsValue({
                  name: record.name,
                  capacity: record.capacity,
                });
                setDetailTypeTable(record);
              }}
              className="text-yellow-500"
            >
              <CiEdit />
            </button>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <>
      <Modal
        okText="Đóng"
        cancelButtonProps={{ style: { display: "none" } }}
        title="Danh sách loại bàn"
        maskClosable={false}
        open={openModalViewTypeTable}
        onOk={() => setOpenModalViewTypeTable(false)}
        onCancel={() => setOpenModalViewTypeTable(false)}
        width={1100}
      >
        <div className="flex w-full flex-row gap-2">
          <Table
            className="w-2/3"
            bordered
            loading={isLoading}
            columns={columns}
            dataSource={listTypeTable}
            size="middle"
            rowKey={(record) => record._id}
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              pageSize: pageSize,
              total: listTypeTable.length,
              showSizeChanger: false,
              showTotal: (total) => `Tổng ${total}`,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              },
            }}
          />
          <div className="w-1/3">
            <Form
              layout="vertical"
              form={form}
              name="form_eidt_type_table"
              initialValues={{
                modifier: "public",
              }}
              clearOnDestroy
              onFinish={(data) => {
                handleUpdateTypeTable(detailTypeTable?._id, data);
                form.resetFields();
                setDetailTypeTable({});
              }}
            >
              <Form.Item
                name="name"
                label="Tên loại bàn"
                rules={[
                  {
                    required: true,
                    message: "Tên loại bàn không được để trống",
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
                    message: "Tên loại bàn không được để trống",
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: "Sức chứa phải là số",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Button
                loading={isLoading}
                htmlType="submit"
                type="primary"
                className="mt-3 w-full"
              >
                Lưu
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalViewTypeTable;
