import { Space, Table } from "antd";
import useFormatPrice from "../../hooks/useFormatPrice";
import { useTranslation } from "react-i18next";

const FormattedPrice = ({ price }) => {
  const formattedPrice = useFormatPrice(price);
  return <>{formattedPrice}</>;
};

const OrderPending = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t("OrderPending.title"),
      dataIndex: "username",
      key: "username",
      render: (_, user) => (
        <Space size="middle">
          <span>{user.avatar}</span>
          <span>{user.username}</span>
        </Space>
      ),
    },
    {
      title: t("OrderPending.id"),
      dataIndex: "order_id",
      key: "order_id",
      render: (order_id) => {
        return <>#{order_id}</>;
      },
    },
    {
      title: t("OrderPending.finalPrice"),
      dataIndex: "FinalPrice",
      key: "FinalPrice",
      render: (FinalPrice) => {
        return <FormattedPrice price={FinalPrice} />;
      },
    },
    {
      title: t("OrderPending.paymentMethod"),
      dataIndex: "idPayment_method",
      key: "idPayment_method",
      render: (idPayment_method) => {
        return idPayment_method === "1"
          ? t("OrderPending.paymentMethodCate.paymentMethod1")
          : t("OrderPending.paymentMethodCate.paymentMethod2");
      },
    },
    {
      title: t("OrderPending.orderDate"),
      dataIndex: "order_date",
      key: "order_date",
    },
    {
      title: t("OrderPending.status"),
      dataIndex: "status_order",
      key: "status_order",
    },
  ];
  const data = [
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "1",
      order_date: "2021-09-01",
      status_order: "Đang chờ xử lý",
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "2",
      order_date: "2021-09-01",
      status_order: "Đang chờ xử lý",
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "1",
      order_date: "2021-09-01",
      status_order: "Đã xác nhận",
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "1",
      order_date: "2021-09-01",
      status_order: "Đã xác nhận",
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "1",
      order_date: "2021-09-01",
      status_order: "Đã xác nhận",
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "2",
      order_date: "2021-09-01",
      status_order: "Đã xác nhận",
    },
  ];
  return (
    <div className="p-2 mb-6">
      <div className="text-xl font-semibold mb-5 ml-3 text-black/85">
        {t("OrderPending.currentOrder")}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.order_id}
        pagination={false}
      />
    </div>
  );
};

export default OrderPending;
