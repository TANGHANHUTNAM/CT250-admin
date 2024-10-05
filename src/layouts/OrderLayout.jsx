import { useState } from "react";
import Detail from "../components/Order/Detail";
import Progress from "../components/Order/Progress";
import { useDynamicTitle } from "../hooks";
import OrderItem from "../components/Order/OrderItem"

const OrderLayout = () => {
  const status = {
    orderin: { key: "orderin", trans: "Order.status.status1" },
    preparing: { key: "preparing", trans: "Order.status.status2" },
    delivering: { key: "delivering", trans: "Order.status.status3" },
    delivered: { key: "delivered", trans: "Order.status.status4" },
  };

  const [activeStatus, setActiveStatus] = useState(status.orderin.key);

  useDynamicTitle("Quản lý đơn hàng");
  return (
    <div className="flex flex-col gap-5 lg:flex-row bg-[#f5f5f5] h-full">
      <div className="flex flex-col gap-5 w-2/5 shrink-0 h-full">
        <Progress
          status={Object.values(status)}
          active={activeStatus}
          setActive={(key) => setActiveStatus(key)}
        />
        <OrderItem/>
      </div>
      <Detail />
    </div>
  );
};

export default OrderLayout;
