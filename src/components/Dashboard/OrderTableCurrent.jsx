import { Table, Tag } from "antd";
import { useSelector } from "react-redux";
const RESERVATION_STATUS = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  canceled: "Đã hủy",
};
const OrderTablePending = () => {
  const columns = [
    {
      title: "ID Đơn đặt bàn",
      dataIndex: "_id",

      render: (_id) => {
        return <span className="font-medium">#{_id}</span>;
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",

      render: (customerName) => <span>{customerName}</span>,
    },
    {
      title: "Email",
      dataIndex: "customerEmail",

      render: (customerEmail) => {
        return <span>{customerEmail}</span>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "customerPhone",

      render: (customerPhone) => {
        return <span>{customerPhone}</span>;
      },
    },

    {
      title: "Trạng thái đơn",
      dataIndex: "status",
      render: (status) => {
        return (
          <Tag
            color={
              status === RESERVATION_STATUS.pending
                ? "blue"
                : status === RESERVATION_STATUS.confirmed
                  ? "yellow"
                  : status === RESERVATION_STATUS.completed
                    ? "green"
                    : "red"
            }
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Thời gian đặt bàn",
      dataIndex: "updatedAt",

      render: (updatedAt) => {
        return (
          <span>
            {new Date(updatedAt).toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
  ];

  const { data } = useSelector((state) => state.dashboard.reservation);

  return (
    <div className="p-2">
      <div className="mb-5 ml-3 text-xl font-semibold text-blue-500">
        ĐƠN ĐẶT BÀN GẦN ĐÂY
      </div>
      <Table
        bordered
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.order_id}
      />
    </div>
  );
};

export default OrderTablePending;
