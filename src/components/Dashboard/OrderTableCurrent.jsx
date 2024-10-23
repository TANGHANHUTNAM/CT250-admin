import { Table, Tag } from "antd";
import { useSelector } from "react-redux";

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
        return <Tag color={"blue"}>{status}</Tag>;
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
      <div className="mb-5 ml-3 text-xl font-semibold text-black/85">
        Đơn đặt bàn gần đây
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
