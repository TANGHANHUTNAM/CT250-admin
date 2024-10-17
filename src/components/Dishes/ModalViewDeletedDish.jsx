import { Image, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { getDeletedDishes, recoverDish } from "../../services/dishService";
import StatusCodes from "../../utils/StatusCodes";
import { toast } from "react-toastify";

const ModalViewDeletedDish = ({
  openModalViewDeletedDish,
  setOpenModalViewDeletedDish,
  setIsLoading,
  fetchDishes,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listDishDeleted, setListDishDeleted] = useState([]);

  useEffect(() => {
    fetchDishesDeleted();
  }, [page, limit]);

  const fetchDishesDeleted = async () => {
    setLoading(true);
    let query = `page=${page}&limit=${limit}`;
    try {
      const res = await getDeletedDishes(query);

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListDishDeleted(res.DT.data);
        setTotal(res.DT.totalData);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleRecoverDish = async (id) => {
    setIsLoading(true);
    setLoading(true);
    try {
      const res = await recoverDish(id);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setPage(1);
        fetchDishes();
        fetchDishesDeleted();
        toast.success("Khôi phục món ăn thành công");
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error("Khôi phục món ăn thất bại");
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    setLoading(false);
  };

  const columns = [
    {
      title: "STT",
      key: "STT",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">{(page - 1) * limit + index + 1}</span>
      ),
    },
    {
      title: "Ảnh",
      width: 150,
      dataIndex: "image",
      align: "center",
      render: (field) => <Image width={80} src={field} />,
    },
    {
      title: "Tên món ăn",
      dataIndex: "name",
    },
    {
      title: "Danh mục cấp 1",
      dataIndex: ["category", "1"],
      render: (field) => <span className="">{field?.name}</span>,
    },
    {
      title: "Danh mục cấp 2",
      dataIndex: ["category", "2"],
      render: (field) => <span className="">{field?.name}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (field) => (
        <span className="text-red-500">
          {field.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => {
            handleRecoverDish(record._id);
          }}
          className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-500/90"
        >
          Khôi phục
        </button>
      ),
    },
  ];

  const handleAfterOpenChange = (open) => {
    if (open) {
      fetchDishesDeleted();
    }
  };
  const handleOnChange = (pagination) => {
    if (pagination.current !== page) {
      setPage(pagination.current);
    }
    if (pagination.pageSize !== limit) {
      setLimit(pagination.pageSize);
    }
  };
  return (
    <>
      <Modal
        open={openModalViewDeletedDish}
        onOk={() => setOpenModalViewDeletedDish(false)}
        onCancel={() => setOpenModalViewDeletedDish(false)}
        okText="Đóng"
        cancelButtonProps={{ style: { display: "none" } }}
        maskClosable={false}
        width={1200}
        style={{ top: 30 }}
        afterOpenChange={handleAfterOpenChange}
      >
        <Table
          title={() => (
            <div className="text-xl font-medium text-blue-500">
              Danh sách món ăn đã xóa
            </div>
          )}
          bordered
          loading={loading}
          columns={columns}
          dataSource={listDishDeleted}
          rowKey={(record) => record._id}
          onChange={handleOnChange}
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            showTotal: (total) => `Tổng ${total} món ăn`,
          }}
        />
      </Modal>
    </>
  );
};
export default ModalViewDeletedDish;
