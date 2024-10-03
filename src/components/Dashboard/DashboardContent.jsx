import { useDynamicTitle } from "../../hooks";
import ListCard from "./ListCard";
import OrderPending from "./OrderCurrent";
import OrderTablePending from "./OrderTableCurrent";

const DashboardContent = () => {
  useDynamicTitle("Dashboard");
  return (
    <div className="p-3">
      <ListCard />
      <OrderPending />
      <OrderTablePending />
    </div>
  );
};

export default DashboardContent;
