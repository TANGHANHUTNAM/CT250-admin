import { useDynamicTitle } from "../../hooks";
import ListCard from "./ListCard";
import OrderPending from "./OrderPending";
import OrderTablePending from "./OrderTablePending";

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
