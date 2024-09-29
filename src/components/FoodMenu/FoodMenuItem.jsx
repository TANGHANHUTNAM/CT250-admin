import thucan from "../../assets/thucan.webp";
import { FaStar } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const FoodMenuItem = ({ dish }) => {
    const { t } = useTranslation();

    return (
        <div className="!w-full">
            {/* image */}
            <div className="group relative flex cursor-pointer flex-col overflow-hidden border-b-2 border-solid border-neutral-200/40 bg-primary p-0 !rounded-t-md w-full h-56">
                <img src={thucan} alt="thucan" className="!w-full !h-full"/>
                {/* label */}
                {dish?.discount && (
                    <div className="discount absolute right-2 z-20 w-fit bg-red-500 px-2 py-1 text-center text-xs font-semibold text-primary">
                        {dish?.discount}
                    </div>
                )}
                {dish?.isNew && (
                    <div className="discount absolute left-2 z-20 w-fit bg-yellow-500 px-2 py-1 text-center text-xs font-bold text-primary">
                        New
                    </div>
                )}
            </div>
            {/* content */}
            <div className="flex flex-col gap-1 !bg-neutral-100 p-2 pt-1 text-left sm:p-3 !rounded-b-md !pb-6 ">
                <div className="name cursor-pointer truncate text-lg font-bold duration-200 hover:text-yellow-600 sm:text-xl !text-black">
                    {dish?.name}
                </div>
                <div className="price flex flex-row items-center gap-2 truncate">
                    <span className="final text-base font-bold text-red-500 sm:text-lg">
                        {dish?.price}đ
                    </span>
                    <span className="old truncate text-xs font-medium text-gray-500 line-through">
                        {dish?.oldPrice}đ
                    </span>
                </div>
                <div className="footer mt-1 flex items-center justify-between">
                    <div className="flex !items-center gap-2">
                        <span className="rating flex !items-center justify-center border-solid bg-violet-100 p-1 text-yellow-600 sm:px-2 !text-black">
                            <FaStar />
                            <span className="ml-1 text-xs font-bold">4.5</span>
                        </span>
                        <span className="sold text-[10px] font-bold sm:text-xs">
                            <span>{dish?.sold}</span>
                            <span className="ml-0.5">{t("Dish.sold")}</span>
                        </span>
                    </div>
                    <div className="favorite flex cursor-pointer text-lg text-red-500">
                        <span className="text-black">
                            <FaBarsProgress />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodMenuItem;