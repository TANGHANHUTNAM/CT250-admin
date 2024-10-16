import { Image, Modal, Popconfirm, Table } from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const ModalViewCategoryLevel2 = ({
  setOpenModalEditCategory,
  setCategoryEdit,
  isLoading,
  listCategoryLevel2,
  setListCategoryLevel2,
  openModalViewCategoryLevel2,
  setOpenModalViewCategoryLevel2,
  handleDeleteCategory,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const handleAfterOpenChange = (open) => {
    if (!open) {
      setCurrentPage(1);
      setPageSize(1);
    }
  };
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
      title: "Ảnh",
      dataIndex: "image",
      width: 70,
      align: "center",
      render: (image) => (
        <>{image ? <Image width={50} src={image || "error"} /> : "__"}</>
      ),
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      align: "center",
      render: (name) => <span className="text-base font-semibold">{name}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "50%",
      align: "center",
      render: (description) => <div className="text-base">{description}</div>,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record) => (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setOpenModalEditCategory(true);
              setCategoryEdit({ isParent: false, ...record });
            }}
            className="text-2xl text-yellow-500"
          >
            <CiEdit />
          </button>
          <Popconfirm
            title={`Xoá danh mục ${record.name}?`}
            description="Bạn có muốn danh mục này?"
            onConfirm={() => {
              handleDeleteCategory(record._id);
            }}
            onCancel={() => {}}
            okText="Có"
            cancelText="Không"
          >
            <button className="text-2xl text-red-500 hover:text-red-500/90">
              <MdOutlineDelete />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      <Modal
        afterClose={() => {
          setListCategoryLevel2([]);
        }}
        afterOpenChange={handleAfterOpenChange}
        open={openModalViewCategoryLevel2}
        onOk={() => setOpenModalViewCategoryLevel2(false)}
        okText="Đóng"
        okButtonProps={{ danger: true }}
        onCancel={() => setOpenModalViewCategoryLevel2(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        maskClosable={false}
        width={1200}
      >
        <Table
          loading={isLoading}
          title={() => (
            <h2 className="text-2xl font-semibold text-red-500">
              Danh mục cấp 2
            </h2>
          )}
          size="large"
          bordered
          columns={columns}
          dataSource={listCategoryLevel2}
          rowKey="_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,

            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: (total) => `Tổng ${total} danh mục`,
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
export default ModalViewCategoryLevel2;
