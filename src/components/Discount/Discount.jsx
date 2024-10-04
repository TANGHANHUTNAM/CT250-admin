import { useDynamicTitle } from "../../hooks";

const Discount = () => {
  useDynamicTitle("Quản lý giảm giá");
  return <div className="p-3">Discount</div>;
};

export default Discount;
