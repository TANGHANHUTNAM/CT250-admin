import { Space, Table } from "antd";
import { createStyles } from "antd-style";
import useFormatPrice from "../../hooks/useFormatPrice";
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
          }
        }
      }
    `,
  };
});

const FormattedPrice = ({ price }) => {
  const formattedPrice = useFormatPrice(price);
  return <>{formattedPrice}</>;
};

const OrderPending = () => {
  const { styles } = useStyle();
  const columns = [
    {
      title: "Khách hàng",
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
      title: "ID Đơn hàng",
      dataIndex: "order_id",
      key: "order_id",
      render: (order_id) => {
        return <>#{order_id}</>;
      },
    },
    {
      title: "Tổng giá trị",
      dataIndex: "FinalPrice",
      key: "FinalPrice",
      render: (FinalPrice) => {
        return <FormattedPrice price={FinalPrice} />;
      },
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "idPayment_method",
      key: "idPayment_method",
      render: (idPayment_method) => {
        return idPayment_method === "1"
          ? "Chuyển khoản VNPay"
          : "Thanh toán khi nhận hàng";
      },
    },
    {
      title: "Thời gian đặt hàng",
      dataIndex: "order_date",
      key: "order_date",
    },
    {
      title: "Trạng thái",
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
        Đơn hàng gần đây
      </div>
      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={data}
        scroll={{
          y: 5 * 50,
        }}
        pagination={false}
      />
    </div>
  );
};

export default OrderPending;
