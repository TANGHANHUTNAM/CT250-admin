import { useTranslation } from "react-i18next";
import OrderItem from "./OrderItem";

const Progress = () => {
    const { t } = useTranslation();

    return (
        <div className="basis-12/12 lg:basis-4/12">
            <div className="flex flex-col border-2 border-neutral-400 justify-center items-center p-6 rounded-lg">
                <div className="bg-neutral-200 rounded-r-lg">
                    <button className="bg-violet-700 text-white font-simebold p-2 !px-4 rounded-l-lg">{t("Order.status.status1")}</button>
                    <button className="p-2 !px-4">{t("Order.status.status2")}</button>
                    <button className="p-2 !px-">{t("Order.status.status3")}</button>
                    <button className="p-2 !px-4 !rounded-r-lg">{t("Order.status.status4")}</button>
                </div>
                <OrderItem />
            </div>
        </div>
    )
}

export default Progress;