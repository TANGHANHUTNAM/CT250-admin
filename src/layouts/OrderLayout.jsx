import Detail from "../components/Order/Detail";
import Progress from "../components/Order/Progress";
import { useDynamicTitle } from "../hooks";

const OrderLayout = () => {
  useDynamicTitle("Quản lý đơn hàng");
  return (
    <div className="flex flex-col lg:flex-row">
      <Progress />
      <Detail />
    </div>
  );
};

export default OrderLayout;
