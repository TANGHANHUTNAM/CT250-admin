import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/format";

const OrderMenu = ({ dishes = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="my-3">
      <div className="mb-2 text-lg font-semibold">{t("Order.menutitle")}</div>
      <div>
        <div className="max-h-64 overflow-y-auto px-2">
          {/* Hiển thị danh sách các mục */}
          {dishes.map((item, index) => (
            <div
              key={`${index}-${item?._id}`}
              className="my-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="rounded-sm">
                  <img src={item?.image} alt="..." className="h-16 w-16" />
                </div>
                <div className="ml-3 flex flex-col">
                  <div className="text-lg font-semibold">
                    <span
                      className={`${item?.deleted === true || item?.available === false ? "text-gray-500 line-through" : ""}`}
                    >
                      {item?.name}
                    </span>
                    {item?.deleted === true ? (
                      <span className="ml-4 rounded-full bg-red-500 px-3 py-1.5 text-sm font-semibold text-white">
                        Đã xóa
                      </span>
                    ) : item?.available === false ? (
                      <span className="ml-4 rounded-full bg-red-500 px-3 py-1.5 text-sm font-semibold text-white">
                        Hết món
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="text-md text-neutral-500">
                    x{item.quantity}
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold text-blue-600">
                {formatCurrency(item?.discountedPrice)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderMenu;
