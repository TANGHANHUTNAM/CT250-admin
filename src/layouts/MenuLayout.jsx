import CategoryBar from "../components/FoodMenu/CategoryBar";
import FoodMenu from "../components/FoodMenu/FoodMenu";
import { useDynamicTitle } from "../hooks";

const MenuLayout = () => {
  useDynamicTitle("Quản lý món ăn");
  return (
    <>
      <CategoryBar />
      <FoodMenu />
    </>
  );
};

export default MenuLayout;
