import { FaEye, FaStar } from "react-icons/fa";
import { formatCurrency } from "../../utils/format";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Popconfirm } from "antd";

const DishItem = ({
  dish,
  setDishDetail,
  setOpenModalViewDish,
  setOpenModalEditDish,
  handleDeleteDish,
}) => {
  return (
    <div className="p-2">
      <div className="w-full shadow-xl">
        {/* image */}
        <div className="group relative flex cursor-pointer flex-col overflow-hidden border-x border-t border-gray-300 bg-neutral-100 p-2">
          <img src={dish?.image} alt="..." loading="lazy" />
          <div className="absolute left-0 top-0 z-10 flex h-full w-0 items-center justify-end bg-black/30 opacity-0 transition-all duration-300 group-hover:w-1/2 group-hover:opacity-100">
            <div
              onClick={() => {
                setDishDetail(dish);
                setOpenModalViewDish(true);
              }}
              className="mr-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-solid border-tertiary bg-primary text-2xl text-tertiary hover:text-yellow-600"
            >
              <FaEye />
            </div>
          </div>
          <div
            onClick={() => {
              setDishDetail(dish);
              setOpenModalEditDish(true);
            }}
            className="absolute right-0 top-0 flex h-full w-0 items-center justify-start bg-black/30 opacity-0 transition-all duration-300 group-hover:w-1/2 group-hover:opacity-100"
          >
            <div className="ml-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-solid border-tertiary bg-primary text-2xl text-tertiary hover:text-yellow-600">
              <CiEdit />
            </div>
          </div>
          {/* label */}
          {dish?.discount > 0 && (
            <div className="discount absolute right-2 z-20 w-fit bg-red-500 px-2 py-1 text-center text-xs font-semibold text-primary">
              -{dish?.discount}%
            </div>
          )}
          {dish?.isNewDish && (
            <div className="discount absolute left-2 z-20 w-fit bg-yellow-500 px-2 py-1 text-center text-xs font-bold text-primary">
              New
            </div>
          )}
        </div>
        {/* content */}
        <div className="flex flex-col gap-1 border-x border-b border-gray-300 bg-neutral-100 p-2 pt-1 text-left sm:p-3">
          <div
            onClick={() => {
              setDishDetail(dish);
              setOpenModalViewDish(true);
            }}
            className="name cursor-pointer truncate text-base font-bold text-tertiary duration-200 hover:text-yellow-600 sm:text-lg"
          >
            {dish?.name}
          </div>
          <div className="price flex flex-row items-center gap-2 truncate">
            <span className="final text-sm font-bold text-red-500 sm:text-base">
              {formatCurrency(dish?.discountedPrice)}
            </span>
            {dish?.discount > 0 && dish?.discountExpirationDate && (
              <span className="old truncate text-xs font-medium text-gray-500 line-through">
                {formatCurrency(dish?.price)}
              </span>
            )}
          </div>
          <div className="footer mt-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rating flex items-center justify-center border-x-2 border-solid border-yellow-500 bg-yellow-200 p-1 text-yellow-600 sm:px-2">
                <FaStar />
                <span className="ml-1 text-xs font-bold">
                  {dish?.averageRating ?? 0}
                </span>
              </span>
              <span className="sold text-[10px] font-bold text-black sm:text-xs">
                <span>{dish?.totalSold}</span>
                <span className="ml-0.5">đã bán</span>
              </span>
            </div>
            <Popconfirm
              title={`Xóa món ăn ${dish?.name}`}
              description={`Bạn có chắc chắn muốn xóa món ăn này?`}
              onConfirm={() => handleDeleteDish(dish?._id)}
              onCancel={() => {}}
              okText="Có"
              cancelText="Không"
            >
              <div className="favorite flex cursor-pointer text-2xl text-red-500">
                <RiDeleteBin6Line />
              </div>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishItem;
