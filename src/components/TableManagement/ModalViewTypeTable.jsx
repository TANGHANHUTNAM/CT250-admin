import { Modal, Table, Tooltip } from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

const ModalViewTypeTable = ({
  listTypeTable,
  openModalViewTypeTable,
  setOpenModalViewTypeTable,
}) => {
  const LIMIT = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIMIT);

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
          <Tooltip title="Chỉnh sửa bàn">
            <button onClick={() => {}} className="text-yellow-500">
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
        width={800}
      >
        <Table
          bordered
          columns={columns}
          dataSource={listTypeTable}
          size="middle"
          rowKey={(record) => record._id}
          pagination={{
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
      </Modal>
    </>
  );
};

export default ModalViewTypeTable;
