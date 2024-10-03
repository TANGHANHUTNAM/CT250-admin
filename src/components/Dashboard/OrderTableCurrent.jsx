import { Space, Table } from "antd";
import { createStyles } from "antd-style";
import useFormatPrice from "../../hooks/useFormatPrice";
import { useTranslation } from "react-i18next";
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

const OrderTablePending = () => {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const columns = [
    {
      title: t("OrderTableCurrent.title"),
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
      title: t("OrderTableCurrent.id"),
      dataIndex: "order_id",
      key: "order_id",
      render: (order_id) => {
        return <>#{order_id}</>;
      },
    },
    {
      title: t("OrderTableCurrent.finalPrice"),
      dataIndex: "FinalPrice",
      key: "FinalPrice",
      render: (FinalPrice) => {
        return <FormattedPrice price={FinalPrice} />;
      },
    },
    {
      title: t("OrderTableCurrent.paymentMethod"),
      dataIndex: "idPayment_method",
      key: "idPayment_method",
      render: (idPayment_method) => {
        return idPayment_method === "1"
          ? t("OrderTableCurrent.paymentMethodCate.paymentMethod1")
          : t("OrderTableCurrent.paymentMethodCate.paymentMethod2");
      },
    },
    {
      title: t("OrderTableCurrent.orderDate"),
      dataIndex: "order_date",
      key: "order_date",
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
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "2",
      order_date: "2021-09-01",
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "1",
      order_date: "2021-09-01",
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "1",
      order_date: "2021-09-01",
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "1",
      order_date: "2021-09-01",
    },
    {
      avatar: "avatar",
      username: "Admin",
      order_id: "123456",
      FinalPrice: 1000000,
      idPayment_method: "2",
      order_date: "2021-09-01",
    },
  ];
  return (
    <div className="p-2">
      <div className="text-xl font-semibold mb-5 ml-3 text-black/85">
        {t("OrderTableCurrent.currentOrder")}
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
      ;
    </div>
  );
};

export default OrderTablePending;
