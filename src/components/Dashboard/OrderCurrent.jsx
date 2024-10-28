import { Table, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/format";
import { useSelector } from "react-redux";
const ORDER_STATUS = {
  pending: "Chờ xác nhận",
  preparing: "Đang chuẩn bị",
  delivering: "Đang vận chuyển",
  completed: "Hoàn thành",
  canceled: "Đã hủy",
};
const OrderPending = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: "ID đơn hàng",
      dataIndex: "_id",

      render: (_id) => <span className="font-medium">#{_id}</span>,
    },
    {
      title: "Khách hàng",
      dataIndex: "receiverName",

      render: (receiverName) => {
        return <span>{receiverName}</span>;
      },
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "orderTotal",
      render: (orderTotal) => {
        return <Tag color={"red"}>{formatCurrency(orderTotal)}</Tag>;
      },
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",

      render: (paymentMethod) => {
        return <span>{paymentMethod}</span>;
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      render: (paymentStatus) => {
        return (
          <Tag color={paymentStatus ? "success" : "red"}>
            {paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      render: (orderStatus) => {
        return (
          <Tag
            color={
              orderStatus === ORDER_STATUS.pending
                ? "blue"
                : orderStatus === ORDER_STATUS.preparing
                  ? "orange"
                  : orderStatus === ORDER_STATUS.delivering
                    ? "gold"
                    : orderStatus === ORDER_STATUS.completed
                      ? "success"
                      : "red"
            }
          >
            {orderStatus}
          </Tag>
        );
      },
    },
    {
      title: "Thời gian đặt hàng",
      dataIndex: "createdAt",

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

  const { data } = useSelector((state) => state.dashboard.order);

  return (
    <div className="mb-6 p-2">
      <div className="mb-5 ml-2 text-xl font-semibold text-blue-500">
        ĐƠN HÀNG GẦN ĐÂY
      </div>
      <Table
        size="small"
        bordered
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.order_id}
        pagination={false}
      />
    </div>
  );
};

export default OrderPending;
