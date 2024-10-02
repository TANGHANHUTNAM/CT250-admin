import { useDynamicTitle } from "../../hooks";
import ListCard from "./ListCard";
import OrderPending from "./OrderCurrent";
import OrderTablePending from "./OrderTableCurrent";

const DashboardContent = () => {
  useDynamicTitle("Dashboard");
  return (
    <>
      <ListCard />
      <OrderPending />
      <OrderTablePending />
    </>
  );
};

export default DashboardContent;
