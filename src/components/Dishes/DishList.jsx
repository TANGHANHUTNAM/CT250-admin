import { Empty, Spin } from "antd";
import DishItem from "./DishItem";
const DishList = ({
  isLoading,
  listDish,
  setDishDetail,
  setOpenModalViewDish,
  setOpenModalEditDish,
  handleDeleteDish,
  handleSetAvailabilityDish,
}) => {
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  } else
    return listDish && listDish.length > 0 ? (
      <div className="grid min-h-screen sm:grid-cols-3 lg:grid-cols-5">
        {listDish.map((dish) => {
          return (
            <DishItem
              key={dish._id}
              dish={dish}
              setDishDetail={setDishDetail}
              setOpenModalViewDish={setOpenModalViewDish}
              setOpenModalEditDish={setOpenModalEditDish}
              handleDeleteDish={handleDeleteDish}
              handleSetAvailabilityDish={handleSetAvailabilityDish}
            />
          );
        })}
      </div>
    ) : (
      <div className="flex min-h-screen items-center justify-center">
        <Empty />
      </div>
    );
};

export default DishList;
