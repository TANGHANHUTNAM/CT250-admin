import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/format";
import { useSelector } from "react-redux";

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
        return <span>{formatCurrency(orderTotal)}</span>;
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
          <span>{paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}</span>
        );
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",

      render: (orderStatus) => {
        return <span>{orderStatus}</span>;
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
      <div className="mb-5 ml-3 text-xl font-semibold text-black/85">
        {t("OrderPending.currentOrder")}
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
