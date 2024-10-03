import CategoryBar from "../components/FoodMenu/CategoryBar";
import FoodMenu from "../components/FoodMenu/FoodMenu";
import { useDynamicTitle } from "../hooks";

const MenuLayout = () => {
  useDynamicTitle("Quản lý món ăn");
  return (
    <div className="p-3">
      <CategoryBar />
      <FoodMenu />
    </div>
  );
};

export default MenuLayout;
