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
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="mt-3">
            <div className="text-lg font-semibold mb-2">{t("Order.menutitle")}</div>
            <div>
                <div className="max-h-64 overflow-y-auto px-3">
                    {/* Hiển thị danh sách các mục */}
                    {items.map((item, index) => (
                        <div className="flex justify-between items-center my-3" key={index}>
                            <div className="flex items-center">
                                <div className="border-2 border-black !p-1 rounded-lg">
                                    <img src={thucan} alt="thucan" className="w-14 h-14" />
                                </div>
                                <div className="flex flex-col ml-3">
                                    <div className="text-lg font-semibold">{item.name}</div>
                                    <div className="text-md text-neutral-500">x{item.quantity}</div>
                                </div>
                            </div>
                            <div className="text-lg font-semibold text-violet-700">
                                +${item.price.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-right text-lg mt-4 border-t-2 border-neutral-300 pr-6">
                    <div className="mt-3 text-lg font-semibold mb-2">
                    {t("Order.total")}
                    </div>
                    <div className="mt-3 text-lg font-semibold text-violet-700">
                        ${total.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderMenu;
