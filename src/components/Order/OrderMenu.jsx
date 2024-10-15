import { useTranslation } from "react-i18next";
import thucan from "../../assets/thucan.webp";

const items = [
  { name: "Com nam Nhat Ban", quantity: 1, price: 5.59 },
  { name: "Com nam Nhat Ban", quantity: 1, price: 5.59 },
  { name: "Com nam Nhat Ban", quantity: 1, price: 5.59 },
  { name: "Com nam Nhat Ban", quantity: 1, price: 5.59 },
  { name: "Com nam Nhat Ban", quantity: 1, price: 5.59 },
  { name: "Com nam Nhat Ban", quantity: 1, price: 5.59 },
  { name: "Com nam Nhat Ban", quantity: 1, price: 5.59 },
];

const OrderMenu = () => {
  const { t } = useTranslation();

  // Tính tổng số tiền
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="mt-3">
      <div className="mb-2 text-lg font-semibold">{t("Order.menutitle")}</div>
      <div>
        <div className="max-h-64 overflow-y-auto px-3">
          {/* Hiển thị danh sách các mục */}
          {items.map((item, index) => (
            <div className="my-3 flex items-center justify-between" key={index}>
              <div className="flex items-center">
                <div className="rounded-lg border-2 border-black !p-1">
                  <img src={thucan} alt="thucan" className="h-14 w-14" />
                </div>
                <div className="ml-3 flex flex-col">
                  <div className="text-lg font-semibold">{item.name}</div>
                  <div className="text-md text-neutral-500">
                    x{item.quantity}
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold text-blue-600">
                +${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t-2 border-neutral-300 pr-6 text-right text-lg">
          <div className="mb-2 mt-3 text-lg font-semibold">
            {t("Order.total")}
          </div>
          <div className="mt-3 text-lg font-semibold text-blue-600">
            ${total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMenu;
