import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/format";

const OrderPending = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: "ID đơn hàng",
      dataIndex: "_id",
      align: "center",
      render: (_id) => <span className="font-medium">#{_id}</span>,
    },
    {
      title: "Khách hàng",
      dataIndex: "receiverName",
      align: "center",
      render: (receiverName) => {
        return <span>{receiverName}</span>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "receiverPhone",
      align: "center",
      render: (receiverPhone) => {
        return <span>{receiverPhone}</span>;
      },
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "orderTotal",
      align: "center",
      render: (orderTotal) => {
        return <span>{formatCurrency(orderTotal)}</span>;
      },
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      align: "center",
      render: (paymentMethod) => {
        return <span>{paymentMethod}</span>;
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      align: "center",
      render: (paymentStatus) => {
        return (
          <span>{paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}</span>
        );
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      align: "center",
      render: (orderStatus) => {
        return <span>{orderStatus}</span>;
      },
    },
    {
      title: "Thời gian đặt hàng",
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
    {
      title: "Thời gian cập nhật",
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
  ];
  const data = [
    {
      _id: "67168335bd30f9ba5b3245e3",
      receiverName: "Trường Toàn",
      receiverPhone: "0123456789",
      receiverAddress: {
        province: "Cần Thơ",
        district: "Quận Ninh Kiều",
        ward: "Phường Xuân Khánh",
        details: "Nguyễn Văn Cừ",
      },
      note: "",
      orderDate: "2024-10-21T16:37:08.057Z",
      deliverDate: null,
      shippingFee: 15500,
      orderTotal: 204500,
      createdAt: "2024-10-21T16:37:09.341Z",
      updatedAt: "2024-10-21T16:37:09.341Z",
      orderStatus: "Chờ xác nhận",
      coupon: 6000,
      couponType: false,
      paymentMethod: "Chuyển khoản qua VNPay",
      paymentStatus: true,
    },
    {
      _id: "67168335bd30f9ba5b3245e4",
      receiverName: "Trường Toàn",
      receiverPhone: "0123456789",
      receiverAddress: {
        province: "Cần Thơ",
        district: "Quận Ninh Kiều",
        ward: "Phường Xuân Khánh",
        details: "Nguyễn Văn Cừ",
      },
      note: "",
      orderDate: "2024-10-21T16:37:08.057Z",
      deliverDate: null,
      shippingFee: 15500,
      orderTotal: 204500,
      createdAt: "2024-10-21T16:37:09.341Z",
      updatedAt: "2024-10-21T16:37:09.341Z",
      orderStatus: "Chờ xác nhận",
      coupon: 6000,
      couponType: false,
      paymentMethod: "Chuyển khoản qua VNPay",
      paymentStatus: true,
    },
  ];
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
