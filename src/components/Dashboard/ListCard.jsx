import { useCountup } from "../../hooks/useCountup";
import { useVNDCountup } from "../../hooks/useCountup";
import { useTranslation } from "react-i18next";
import { LineChart1, LineChart2, LineChart3, BarChart1 } from "./Chart";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ListCard = () => {
  const {
    customer,
    reservation: { count: reservationCount },
    order: { count: orderCount },
    income,
  } = useSelector((state) => state.dashboard);

  const { countUpRef: ordersCountRef, update: updateOrderCount } =
    useCountup(orderCount);
  const { countUpRef: tableOrdersCountRef, update: updateReservationCount } =
    useCountup(reservationCount);
  const { countUpRef: incomeCountRef, update: updateIncome } =
    useVNDCountup(income);
  const { countUpRef: newCustomersCountRef, update: updateNewCustomerCount } =
    useCountup(customer);

  useEffect(() => {
    updateNewCustomerCount(customer);
    updateReservationCount(reservationCount);
    updateOrderCount(orderCount);
    updateIncome(income);
  }, [reservationCount, customer, orderCount]);

  const { t } = useTranslation();

  return (
    <div className="mb-4 flex flex-wrap text-white">
      {/* Card item */}
      <div className="w-full p-2 sm:w-1/2 lg:w-1/4">
        <div className="flex h-full flex-col rounded-md bg-[rgb(103,97,217)]">
          <div className="flex flex-col gap-1 p-4 pb-0">
            <span
              ref={ordersCountRef}
              className="total text-2xl font-semibold"
            ></span>
            <span className="des w-full text-lg">
              {t("ListCard.orderToday")}
            </span>
          </div>
          <div className="flex h-28 justify-center p-4">
            <LineChart1 />
          </div>
        </div>
      </div>
      {/* Card item */}
      <div className="w-full p-2 sm:w-1/2 lg:w-1/4">
        <div className="flex h-full flex-col rounded-md bg-[#2C89DB]">
          <div className="flex flex-col gap-1 p-4 pb-0">
            <span
              ref={tableOrdersCountRef}
              className="total text-2xl font-semibold"
            ></span>
            <span className="des text-lg">{t("ListCard.orderTableToday")}</span>
          </div>
          <div className="flex h-28 justify-center p-4">
            <LineChart2 />
          </div>
        </div>
      </div>
      {/* Card item */}
      <div className="w-full p-2 sm:w-1/2 lg:w-1/4">
        <div className="flex h-full flex-col rounded-md bg-[#F79F0E]">
          <div className="flex flex-col gap-1 p-4 pb-0">
            <span
              ref={incomeCountRef}
              className="total text-2xl font-semibold"
            ></span>
            <span className="des text-lg">{t("ListCard.incomeToday")}</span>
          </div>
          <div className="flex h-28 justify-center p-4">
            <LineChart3 />
          </div>
        </div>
      </div>
      {/* Card item */}
      <div className="w-full p-2 sm:w-1/2 lg:w-1/4">
        <div className="flex h-full flex-col rounded-md bg-[#DE4242]">
          <div className="flex flex-col gap-1 p-4 pb-0">
            <span
              ref={newCustomersCountRef}
              className="total text-2xl font-semibold"
            ></span>
            <span className="des text-lg">{t("ListCard.newCustomer")}</span>
          </div>
          <div className="flex h-28 justify-center p-4">
            <BarChart1 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
