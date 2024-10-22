import { Table, Tag } from "antd";

const OrderTablePending = () => {
  const columns = [
    {
      title: "ID Đơn đặt bàn",
      dataIndex: "_id",
      align: "center",
      render: (_id) => {
        return <span className="font-medium">#{_id}</span>;
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      align: "center",
      render: (customerName) => <span>{customerName}</span>,
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      align: "center",
      render: (customerEmail) => {
        return <span>{customerEmail}</span>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "customerPhone",
      align: "center",
      render: (customerPhone) => {
        return <span>{customerPhone}</span>;
      },
    },

    {
      title: "Trạng thái đơn",
      dataIndex: "status",
      align: "center",
      render: (status) => {
        return <Tag color={"blue"}>{status}</Tag>;
      },
    },
    {
      title: "Thời gian đặt bàn",
      dataIndex: "updatedAt",
      align: "center",
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
    {
      title: "Thời gian cập nhật",
      dataIndex: "createdAt",
      align: "center",
      render: (createdAt) => {
        return (
          <span>
            {new Date(createdAt).toLocaleString("vi-VN", {
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

  const data = [
    {
      _id: "67121013be2304379808a127",
      accountId: "670b7a995ce01e34a9cad62d",
      customerEmail: "namtanghanhut@gmail.com",
      customerName: "Nam Tăng",
      customerPhone: "0363655371",
      arrivalDate: "2024-10-18T17:00:00.000Z",
      arrivalTime: "03:37",
      peopleNumber: 5,
      note: "",
      createdAt: "2024-10-18T07:36:51.074Z",
      updatedAt: "2024-10-18T07:36:51.074Z",
      status: "Chờ xác nhận",
      tables: [],
    },
    {
      _id: "67120f0cbe2304379808a0bc",
      accountId: "670b7a995ce01e34a9cad62d",
      customerEmail: "namtanghanhut83@gmail.com",
      customerName: "Nhựt Nam",
      customerPhone: "0363655371",
      arrivalDate: "2024-10-18T17:00:00.000Z",
      arrivalTime: "15:32",
      peopleNumber: 4,
      note: "",
      createdAt: "2024-10-18T07:32:28.982Z",
      updatedAt: "2024-10-18T07:34:35.238Z",
      status: "Hoàn thành",
      tables: [3, 4],
    },
  ];

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
